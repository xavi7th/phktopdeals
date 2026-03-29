//TO RUN THIS SCRIPT RUN bun run push -- dev OR bun run push -- production OR bun run push
//When run without an option, it defaults to dev

import fs from "fs";
import { execSync } from "child_process";

const server = process.argv[2]; // Get the argument passed from bun
const branch = server === "production" ? "deploy/master" : "deployment";
const remoteServerName = "namecheap"; // check this out with git remote
const CONTINUE_FILE = ".deploy_continue";

// Check if we're resuming after a merge conflict
const isResuming = fs.existsSync(CONTINUE_FILE);

if (!isResuming) {
  // Check if there are local changes before stashing
  const statusOutput = execSync("git status --porcelain").toString().trim();
  var hasLocalChanges = !!statusOutput;

  if (hasLocalChanges) {
    console.log("Stashing local changes...");
    execSync("git stash -k -u", { stdio: "inherit" });
  } else {
    console.log("No changes detected. Skipping stash.");
  }

  // Switch to the target deployment branch
  console.log(`Switching to ${branch} branch...`);
  execSync(`git checkout ${branch}`, { stdio: "inherit" });

  console.log(`Merging development branch into ${branch}...`);
  try {
    execSync("git merge development --no-edit", { stdio: "inherit" });
  } catch (_) {
    console.error("❌ Merge conflict detected! Resolve conflicts, then re-run `bun run push`.");
    fs.writeFileSync(CONTINUE_FILE, "true"); // Mark that we're in the middle of a merge
    process.exit(1);
  }
} else {
  console.log("✅ Resuming deployment after merge conflict resolution...");
  fs.unlinkSync(CONTINUE_FILE);
}

// Backup and replace .env file
console.log("Backing up and replacing .env with .env.production...");

try {
  // Backup the current .env file if it exists
  if (fs.existsSync(".env")) {
    fs.copyFileSync(".env", ".env.bak");
  }
  // Replace with production version
  if (fs.existsSync(".env.production")) {
    fs.copyFileSync(".env.production", ".env");
  } else {
    console.error("❌ .env.production file not found!");
    process.exit(1);
  }
} catch (error) {
  console.error("❌ Failed to swap .env files:", error);
  process.exit(1);
}

console.log("Creating build folder if not exists");
execSync("mkdir -p build", { stdio: "inherit" });

// Modify .gitignore to allow public files to be committed
console.log("Updating .gitignore to allow public files...");
execSync("sed -i.bak '/build/d' ./.gitignore", { stdio: "inherit" });

// Run the build process
console.log("Running build...");
execSync("bun run build", { stdio: "inherit" });

console.log("Copying package.json and node loader script into build folder...");
execSync("cp -f package.json src/loader.cjs build", { stdio: "inherit" });
execSync("mkdir -p build/lib/server", { stdio: "inherit" });
execSync("cp -f src/lib/server/logger-core.js build/lib/server/", { stdio: "inherit" });

// Check if there are new changes after the build
const postBuildStatus = execSync("git status --porcelain").toString().trim();
if (postBuildStatus) {
  const commitMessage = `Build commit: ${Math.random().toString(36).substring(7)}`;
  console.log(`Staging new changes with commit message: ${commitMessage}`);
  execSync("git add .", { stdio: "inherit" });
  execSync(`git commit -m "${commitMessage}"`, { stdio: "inherit" });
} else {
  console.log("No changes to commit. Proceeding with push...");
}

// Push changes to the remote repository
console.log("Pushing changes...");
try {
  execSync(`git push ${remoteServerName} --force --verbose`, { stdio: "inherit" });

  console.log("Push successful. Restoring original .env file...");
  try {
    if (fs.existsSync(".env.bak")) {
      fs.copyFileSync(".env.bak", ".env");
      fs.unlinkSync(".env.bak");
    }
  } catch (error) {
    console.error("❌ Failed to restore .env file:", error);
  }

  console.log("Switching back to development branch...");

  execSync("git switch development", { stdio: "inherit" });

  console.log("Switch successful.");

  // Restore stashed changes only if we originally stashed something
  if (hasLocalChanges) {
    console.log("Restoring stashed changes...");
    try {
      execSync("git stash pop", { stdio: "inherit" });
    } catch (_) {
      console.log("⚠️ Possible merge conflict detected! Restoring stashed changes failed.");
    }
  }
} catch (_) {
  console.error("❌ Push failed. Rolling back the last commit...");

  try {
    if (fs.existsSync(".env.bak")) {
      fs.copyFileSync(".env.bak", ".env");
      fs.unlinkSync(".env.bak");
    }
  } catch (error) {
    console.error("❌ Failed to restore .env file:", error);
  }

  console.error("Rolling back the last commit...");
  execSync("git reset --soft HEAD~1", { stdio: "inherit" });
  console.error("Changes kept in the staging area for review.");
}
