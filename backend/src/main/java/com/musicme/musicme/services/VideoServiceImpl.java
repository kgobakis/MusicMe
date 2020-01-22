package com.musicme.musicme.services;

import com.musicme.musicme.entities.Video;
import com.musicme.musicme.entities.User;
import com.musicme.musicme.entities.VideoIdentity;
import com.musicme.musicme.repositories.UserRepository;
import com.musicme.musicme.repositories.VideoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Example;

import java.util.ArrayList;
import java.util.List;

@Service
public class VideoServiceImpl implements VideoService {

    @Qualifier("videoRepository")
    private VideoRepository videoRepository;

    @Qualifier("userRepository")
    private UserRepository userRepository;

    @Autowired
    public VideoServiceImpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @Override
    public List<Video> listAll() {
        List<Video> videos = new ArrayList<Video>();
        videoRepository.findAll().forEach(videos::add);
        return videos;
    }

    @Override
    public List<Video> getByUser(Long userId) {
        List<Video> videos = new ArrayList<Video>();

        // Creating VideoId instance
        VideoIdentity onlyUserId = new VideoIdentity();
        
        // Setting only user portion of composite key to obtain full list for said user
        onlyUserId.setUser(userId);

        // Creating a template of sorts with Example.class and then grabbing all videos that match these credentials
        Video example = new Video();
        example.setVideoIdentity(onlyUserId);
        videoRepository.findAll(Example.of(example)).forEach(videos::add);
        return videos;
    }

    @Override
    public Video getByPathToVideo(String pathToVideo) {
        return videoRepository.findByPathToVideo(pathToVideo);
    }

    @Override
    public Video saveOrUpdate(Video video) {
        videoRepository.save(video);
        return video;
    }

    @Override
    public Video delete(VideoIdentity videoId) {
        return videoRepository.deleteByVideoIdentity(videoId);
    }

}