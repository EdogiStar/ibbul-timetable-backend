const repository = require("./repository");
const { generateSessions } = require("../sessionGenerator");
const { findPlacement } = require("../backtracking");

class GroupScheduler {

    async generate() {

        const [
            groupLectures,
            groupParticipants,
            courseOfferings,
            courses,
            departments,
            days,
            timeSlots,
            venues,
            timetableEntries
        ] = await Promise.all([

            repository.getGroupLectures(),
            repository.getGroupParticipants(),
            repository.getCourseOfferings(),
            repository.getCourses(),
            repository.getDepartments(),
            repository.getDays(),
            repository.getTimeSlots(),
            repository.getVenues(),
            repository.getExistingTimetable()

        ]);

        const entries = [];

        for (const groupLecture of groupLectures) {

            const participants = groupParticipants.filter(
                participant =>
                    participant.group_lecture_id === groupLecture.id
            );

            if (!participants.length) {
                continue;
            }

            const course = courses.find(
                item =>
                    item.id === groupLecture.course_id
            );

            if (!course) {
                throw new Error("Course not found.");
            }

            const offering = courseOfferings.find(
                item =>
                    item.course_id === course.id
            );

            if (!offering) {
                throw new Error("Course offering not found.");
            }

            const department = departments.find(
                item =>
                    item.id === course.department_id
            );

            if (!department) {
                throw new Error("Department not found.");
            }

            const sessions = generateSessions([{

                course_id: course.id,
                course_offering_id: offering.id,

                course_code: course.course_code,
                course_title: course.course_title,

                programme_id: participants[0].programme_id,
                level_id: participants[0].level_id,

                session_id: offering.session_id,
                semester_id: offering.semester_id,

                department_id: department.id,
                faculty_id: department.faculty_id,

                student_count: course.student_count,
                preferred_venue_type: course.preferred_venue_type,

                hours_per_week: course.hours_per_week,
                sessions_per_week: course.sessions_per_week

            }]);

            const session = sessions[0];

            session.groupLectureId = groupLecture.id;

            const placement = findPlacement({

                session,
                days,
                timeSlots,
                venues,
                timetableEntries,
                isGroupSchedule: true

            });

            if (!placement) {
                throw new Error("Unable to schedule group lecture.");
            }

            if (
                placement.suitableVenues.length <
                participants.length
            ) {
                throw new Error(
                    "Not enough available venues."
                );
            }

            participants.forEach((participant, index) => {

                const venue =
                    placement.suitableVenues[index];

                entries.push({

                    course_id: course.id,
                    lecturer_id: null,

                    department_id: department.id,
                    faculty_id: department.faculty_id,

                    venue_id: venue.id,

                    is_group: true,
                    group_lecture_id: groupLecture.id,
                    group_participant_id: participant.id,

                    is_locked: false,

                    programme_id: participant.programme_id,
                    level_id: participant.level_id,

                    course_offering_id: offering.id,
                    session_id: offering.session_id,
                    semester_id: offering.semester_id,

                    day_id: placement.day.id,
                    time_slot_id: placement.slots[0].id,

                    course_allocation_id: null

                });

                timetableEntries.push({

                    venue_id: venue.id,
                    day_id: placement.day.id,
                    time_slot_id: placement.slots[0].id,

                    programme_id: participant.programme_id,
                    level_id: participant.level_id,

                    group_lecture_id: groupLecture.id

                });

            });

        }

        for (const entry of entries) {
            await repository.saveEntry(entry);
        }

        await repository.markGenerated(
            groupLectures.map(item => item.id)
        );

        return {

            success: true,
            scheduled: entries.length

        };

    }

}

module.exports = new GroupScheduler();