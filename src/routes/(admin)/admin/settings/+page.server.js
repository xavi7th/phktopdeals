import {aiService} from '$lib/Services/aiService';

export const load = async () => {
    return {
        canRebuild: await aiService.canRebuild(),
        timeUntilRebuild: await aiService.getTimeUntilRebuild(),
    };
};

export const actions = {
    rebuild: async () => {
        const canRebuild = await aiService.canRebuild();
        if (!canRebuild) {
            return { success: false, error: 'Rebuild cooldown active' };
        }

        try {
            const stats = await aiService.rebuild();
            return { success: true, stats };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
};
