CREATE TABLE noteful_notes (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    notename TEXT NOT NULL,
    notecontents TEXT NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT now()
);


