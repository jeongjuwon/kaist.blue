package com.kaist.service;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.kaist.entity.CommunityUser;
import com.kaist.entity.User;
import com.kaist.repository.CommunityUserRepository;
import com.kaist.repository.UserRepository;

@Service
public class CommunityUserService {
	
	
	@Autowired
	CommunityUserRepository communityUserRepo;
	
	@Autowired
	UserRepository  userRepo;
	
	public CommunityUser userAdd(CommunityUser cu, Authentication auth) {
		
		//인증된 사용자 정보를 찾기
		
		UserDetails userDetails = (UserDetails) auth.getPrincipal();
		String userName = userDetails.getUsername();
		User user = userRepo.findByUserId(userName);
		cu.setUserId(user.getId());
		
		if(user.getId() != cu.getUserId()) return null;
		 
		if(!communityUserRepo.existsByCommunityIdAndUserId(cu.getCommunityId(), cu.getUserId())) {
			if(cu.imageStr != null) {
				return communityUserImageSave(cu);
			}else {
				return communityUserRepo.save(cu);
			}
			
		}else {
			return null;
		}
	}
	
	public CommunityUser communityUserImageSave(CommunityUser communityUser) {
		//DATA URL 을 바이트로 변환
		  byte imageArray [] = null;
		  
		  //이미지가 있는 경우 저장
		  String BASE_64_PREFIX = "data:image/png;base64,";
		  String base64Url = communityUser.getImageStr();
		  String[] base64Array = base64Url.split(",");
		  if(BASE_64_PREFIX != base64Array[0]) {
			  BASE_64_PREFIX = base64Array[0]+",";
		  }
		  
		  if(base64Url!=null&&base64Url!="") {
			  try {
				  
				  if(base64Url.startsWith(BASE_64_PREFIX)) {
			            if (base64Url.startsWith(BASE_64_PREFIX)){
			                imageArray =  Base64.getDecoder().decode(base64Url.substring(BASE_64_PREFIX.length()));
			            }
//			            System.out.println(imageArray);
			            communityUser.setImage(imageArray);
			            communityUser.setType(BASE_64_PREFIX);
				  }
			  }catch(Exception e) {
				  e.printStackTrace();
			  }
			
		  }
		  CommunityUser result = communityUserRepo.save(communityUser);
		  return result;
	  }
	
	
	
	
	

}
