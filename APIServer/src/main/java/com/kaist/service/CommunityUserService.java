package com.kaist.service;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;

import com.kaist.mapper.KaistMapper;
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

	@Autowired
	KaistMapper mapper;
	
	public CommunityUser userAdd(CommunityUser cu, Authentication auth) {

		//인증된 사용자 정보를 찾기

		UserDetails userDetails = (UserDetails) auth.getPrincipal();
		String userName = userDetails.getUsername();
		User user = userRepo.findByUserId(userName);
		cu.setUserId(user.getId());

			if (communityUserRepo.existsByCommunityIdAndUserId(cu.getCommunityId(), cu.getUserId())) {
					CommunityUser checkCu = communityUserRepo.findByUserIdAndCommunityId(user.getId(), cu.getCommunityId());
					if (null != checkCu) {
						if(cu.getNickName() != null) checkCu.setNickName(cu.getNickName());
						if(cu.getImage() != null) checkCu.setImage(cu.getImage());
						if(cu.getType() != null) checkCu.setType(cu.getType());
						if(cu.getSortNo() != null) checkCu.setSortNo(cu.getSortNo());
						if(cu.getCreatedAt() != null) checkCu.setCreatedAt(cu.getCreatedAt());
						return communityUserImageSave(checkCu);
					}else{
						return null;
					}
			} else {
				return communityUserImageSave(cu);
			}
	}

	public List<HashMap> userDelete(CommunityUser cu, Authentication auth) {

		//인증된 사용자 정보를 찾기

		UserDetails userDetails = (UserDetails) auth.getPrincipal();
		String userName = userDetails.getUsername();
		User user = userRepo.findByUserId(userName);
		cu.setUserId(user.getId());
		communityUserRepo.delete(cu);
		HashMap<String, Long> param = new HashMap<>();
		param.put("userId", user.getId());
		return mapper.findByMyCommunity(param);
	}

	public CommunityUser communityUserImageSave(CommunityUser communityUser) {
		//DATA URL 을 바이트로 변환

		if(null != communityUser.getImageStr() && !communityUser.getImageStr().isEmpty()){
			  byte imageArray [] = null;
			  //이미지가 있는 경우 저장
			  String BASE_64_PREFIX = "data:image/png;base64,";
			  String base64Url = communityUser.getImageStr();
			  String[] base64Array = base64Url.split(",");
			  if(!BASE_64_PREFIX.equals(base64Array[0]) ) {
				  BASE_64_PREFIX = base64Array[0]+",";
			  }

			  if(!base64Url.isEmpty()) {
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
		}
		  CommunityUser result = communityUserRepo.save(communityUser);
		  return result;
	  }
	
	
	
	
	

}
