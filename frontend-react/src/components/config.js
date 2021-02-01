// CONFIGURATION OF MANAGE AREA

export const stream_entries = [
        {name: "name", displayName: "Stream Title", type: "text"},
        {name: "room", displayName: "Location", type: "dropdown", entries: ["Room 1", "Room 2", "Room 3", "Room 4"]},
        {name: "date", displayName: "Date", type: "date"},
        {name: "time", displayName: "Time", type: "time"},
        {name: "lecture", displayName: "Lecture", type: "dropdown", apiUrl: "/lectures/?action=all"},
]

export const lecture_entries = [
        {name: "name", displayName: "Lecture name", type: "text"},
        {name: "semester", displayName: "Semester", type: "dropdown", entries: ["WS19/20", "SS20", "WS20/21"]},
        {name: "teacher", displayName: "Teacher", type: "text"},
        {name: "lecture_type", displayName: "Type", type: "dropdown", entries : ["Vorlesung", "Übung", "Tutorium"]},
]