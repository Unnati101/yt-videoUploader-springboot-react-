package com.example.ai_backend.service;


import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.client.http.ByteArrayContent;
import com.google.api.client.http.GenericUrl;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpResponse;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.InputStreamContent;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

@Service

public class YoutubeVideoUpload {

    private static final String UPLOAD_URL= "https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status";

    private static final JsonFactory JSON_FACTORY= JacksonFactory.getDefaultInstance();


    private static final  HttpTransport HTTP_Transport = new NetHttpTransport();

    public String uploadVideo(String title, String desc, String visibility, MultipartFile videoFile, String accessToken) throws IOException{  //all these information is taken from backend
     
        HttpRequestFactory requestFactory = HTTP_Transport.createRequestFactory();


        String metaData="{\n" + 
                        "  \"snippet\": {\n" + 
                        "    \"title\": \""+title+"\",\n" + 
                        "    \"description\": \""+desc+"\",\n" + 
                        "    \"tags\": [\"learn with unnati\", \"unnati \", \"technology\"],\n" + 
                        "    \"categoryId\": 22\n" + 
                        "  },\n" + 
                        "  \"status\": {\n" + 
                        "    \"privacyStatus\": \""+visibility+"\",\n" + 
                        "    \"embeddable\": True,\n" + 
                        "    \"license\": \"youtube\"\n" + 
                        "  }\n" + 
                        "}";


                        HttpRequest request = requestFactory.buildPostRequest(
                          
                       new GenericUrl(UPLOAD_URL),
                        ByteArrayContent.fromString("application/json", metaData)
                       );


                       request.getHeaders().setAuthorization("Bearer "+accessToken);
                       request.getHeaders().setContentType("application/json");

                       HttpResponse response = request.execute();


                   //abhi bs video ka meta data create kia hai
    

                   //now  upload video
                    
                 String videoUploadUrl = response.getHeaders().getLocation();

                   HttpRequest httpRequest = requestFactory.buildPutRequest(
                               new GenericUrl(videoUploadUrl),
                               new InputStreamContent( "video/*", videoFile.getInputStream() )
                   );
                
                    HttpResponse httpResponse = httpRequest.execute();

                    return "Upload Successfully ";
                    }


}
