const supabase = require("../../../database/supabase");


class GroupRepository {


    async getGroupLectures() {

        const { data, error } = await supabase
            .from("group_lectures")
            .select("*")
            .eq("generated", false);

        if (error) throw error;

        return data;

    }


    async getGroupParticipants() {

        const { data, error } = await supabase
            .from("group_lecture_participants")
            .select("*");

        if (error) throw error;

        return data;

    }


    async getCourseOfferings() {

        const { data, error } = await supabase
            .from("course_offerings")
            .select("*");

        if (error) throw error;

        return data;

    }


    async getCourses() {

        const { data, error } = await supabase
            .from("courses")
            .select("*");

        if (error) throw error;

        return data;

    }


    async getDepartments() {

        const { data, error } = await supabase
            .from("departments")
            .select("*");

        if (error) throw error;

        return data;

    }


    async getDays() {

        const { data, error } = await supabase
            .from("days")
            .select("*")
            .order("sort_order");

        if (error) throw error;

        return data;

    }


    async getTimeSlots() {

        const { data, error } = await supabase
            .from("time_slots")
            .select("*")
            .order("sort_order");

        if (error) throw error;

        return data;

    }


    async getVenues() {

        const { data, error } = await supabase
            .from("venues")
            .select("*");

        if (error) throw error;

        return data;

    }


    async getExistingTimetable() {

        const { data, error } = await supabase
            .from("timetable_entries")
            .select("*");

        if (error) throw error;

        return data;

    }


    async saveEntry(payload) {

        const { data, error } = await supabase
            .from("timetable_entries")
            .insert(payload)
            .select()
            .single();

        if (error) throw error;

        return data;

    }


    async markGenerated(ids) {

        const { error } = await supabase
            .from("group_lectures")
            .update({
                generated: true
            })
            .in("id", ids);

        if (error) throw error;

        return true;

    }


}


module.exports = new GroupRepository();