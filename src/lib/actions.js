/**
 * @param {HTMLElement} node
 * @param {Object} options - Options to configure the behaviour of the typewriter
 * @param {string[]} options.texts - The texts you want to cycle through using the typewriter effect
 * @param {number} [options.pauseInterval=3000] - specify the duration in ms to display each text before going to the next
 * @param {number} [options.bridgeInterval=1500] - specify the pause between deleting the previous text and beginning the next one
 * @param {number} [options.typingSpeed=100] - the speed of the typewriter
 */
export function typewriter(node, options = {texts: []}) {

  console.log(options);

	let texts = options.texts, txtIdx = 0, charIndex = 0, curText = '';

  /** @param {boolean} [isTyping] */
	const updateInnerHTML = (isTyping) => {
    node.innerHTML = '&#8203;' + curText + (isTyping ? '|' : ''); // Always include the zero-width space and conditionally add the text and cursor
	};

	const blinkingCursor = () => {
		if (curText.endsWith('|')) {
			curText = curText.slice(0, -1);
		} else {
			curText += '|';
		}
		updateInnerHTML();
	};

  /**
   * Blinking cursor effect
   *
   * @param {number} delay
 */
	const waitingEffect = (delay) => {
		const interval = setInterval(blinkingCursor, 500);

		setTimeout(() => {
			clearInterval(interval); // Stop blinking
			if (curText.endsWith('|')) {
        curText = curText.slice(0, -1); // Remove cursor if it's still there
			}
			updateInnerHTML();
		}, delay);
	};

	// Typing animation effect
	const typeEffect = () => {
		const currentString = texts[txtIdx];
		const delay = currentString[charIndex] === ' ' ? 75 : options.typingSpeed || 100; // Faster delay for spaces

		if (charIndex < currentString.length) {
			curText += currentString[charIndex++];
			setTimeout(typeEffect, delay);
		} else {
			waitingEffect(options.pauseInterval || 3000);
			setTimeout(deleteEffect, options.pauseInterval || 3000); // Wait before starting to delete
		}

		updateInnerHTML(true);
	};

	// Deleting animation effect
	const deleteEffect = () => {
		if (charIndex > 0) {
			curText = curText.slice(0, --charIndex);
			setTimeout(deleteEffect, (options.typingSpeed || 100) / 2);
		} else {
			txtIdx = (txtIdx + 1) % texts.length; // Ensures that the loop keeps indefinitely using modulo
			curText = ''; // Clear text but keep zero-width space

			waitingEffect(options.bridgeInterval || 600);
			setTimeout(typeEffect, options.bridgeInterval || 600);
		}

		updateInnerHTML();
	};

	// Start typing effect
	setTimeout(typeEffect, 500);

	return {
		onDestroy() {},
    afterUpdate() {
      console.log('updatedx');
    },

    /** @param {string[]} newTexts */
		update(newTexts) {
      console.log(newTexts);
			texts = newTexts;
		}
	};
}
