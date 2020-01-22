package com.musicme.musicme.services;

import com.musicme.musicme.entities.Video;
import com.musicme.musicme.entities.VideoIdentity;

import java.util.List;

public interface VideoService {

    List<Video> listAll();

    List<Video> getByUser(Long userId);

    Video getByPathToVideo(String pathToVideo);

    Video saveOrUpdate(Video video);

    Video delete(VideoIdentity videoId);

}
