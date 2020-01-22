CREATE TABLE Users (
	username VARCHAR(20) NOT NULL,
	u_name   VARCHAR(20),
	email    VARCHAR(20),
	PRIMARY KEY(username)
)

CREATE TABLE User_Likes (
	username VARCHAR(20),
	video_id uuid,
	PRIMARY KEY(username, video_id),
	FOREIGN KEY(username) REFERENCES Users
		ON DELETE NO ACTION,
	FOREIGN KEY(video_id) REFERENCES Videos
		ON DELETE NO ACTION
)

CREATE TABLE User_Plays (
	username        VARCHAR(20),
	instrument_name VARCHAR(20),
	PRIMARY KEY(username, instrument_name),
	FOREIGN KEY(username) REFERENCES Users
		ON DELETE CASCADE,
	FOREIGN KEY(instrument_name) REFERENCES Instruments
		ON DELETE NO ACTION
)

CREATE TABLE Instruments (
	instrument_name VARCHAR(20),
	PRIMARY KEY(instrument_name)
)

CREATE TABLE Direct_Messages (
	time_stamp TIMESTAMP,
	message    TEXT,
	video_id   uuid,
	user_from  VARCHAR(20),
	user_to    VARCHAR(20),
	PRIMARY KEY(time_stamp, user_from, user_to),
	FOREIGN KEY(user_from) REFERENCES Users
		ON DELETE NO ACTION,
	FOREIGN KEY(user_to) REFERENCES Users
		ON DELETE NO ACTION
)

CREATE TABLE Videos (
	video_id        uuid,
	time_stamp      TIMESTAMP,
	loc             LOCATION,
	caption         TEXT,
	username        VARCHAR(20),
	instrument_name VARCHAR(20),
	PRIMARY KEY(video_id)
)