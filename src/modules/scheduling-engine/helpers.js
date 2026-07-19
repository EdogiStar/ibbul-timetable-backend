/**
 * ------------------------------------------------------------------
 * Scheduling Engine Helpers
 * ------------------------------------------------------------------
 * These are reusable utility functions used by the scheduling engine.
 * They DO NOT schedule courses.
 * They DO NOT access the database.
 * They simply make the scheduler cleaner.
 * ------------------------------------------------------------------
 */

/**
 * Shuffle an array (Fisher-Yates Shuffle)
 * Helps distribute sessions more naturally.
 */
function shuffleArray(array) {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

/**
 * Sort sessions from hardest to easiest.
 *
 * Priority:
 * 1. Longer duration
 * 2. Larger student population
 * 3. Practical before theory
 */
function sortSessions(sessions) {
    return [...sessions].sort((a, b) => {

        // Longer sessions first
        if (b.duration !== a.duration) {
            return b.duration - a.duration;
        }

        // Larger classes first
        if (b.studentCount !== a.studentCount) {
            return b.studentCount - a.studentCount;
        }

        // Practical before theory
        if (a.isPractical !== b.isPractical) {
            return a.isPractical ? -1 : 1;
        }

        return 0;
    });
}

/**
 * Group time slots by day.
 *
 * Example output:
 *
 * {
 *   Monday: [...],
 *   Tuesday: [...]
 * }
 */
function groupTimeSlotsByDay(days, timeSlots) {

    const grouped = {};

    for (const day of days) {

        grouped[day.name] = timeSlots.map(slot => ({
            dayId: day.id,
            day: day.name,

            slotId: slot.id,
            startTime: slot.start_time,
            endTime: slot.end_time,
            order: slot.order
        }));

    }

    return grouped;
}

/**
 * Get consecutive slots.
 *
 * Example:
 *
 * duration = 2
 *
 * Returns:
 * [
 *   8-9,
 *   9-10
 * ]
 */
function getConsecutiveSlots(daySlots, startIndex, duration) {

    const selectedSlots = [];

    for (let i = 0; i < duration; i++) {

        const slot = daySlots[startIndex + i];

        if (!slot) {
            return null;
        }

        selectedSlots.push(slot);
    }

    return selectedSlots;
}

module.exports = {
    shuffleArray,
    sortSessions,
    groupTimeSlotsByDay,
    getConsecutiveSlots
};