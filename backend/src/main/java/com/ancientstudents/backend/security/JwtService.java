package com.ancientstudents.backend.security;


import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {


    private String secretKey = SecurityConstants.SECRET_KEY;
    private long jwtExpiration = SecurityConstants.JWT_EXPIRATION;
    private long refreshExpiration = SecurityConstants.REFRESH_EXPIRATION;

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails){
         return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(
        Map<String, Object> extraClaims,
        UserDetails userDetails
    ) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    public String generateRefreshToken(
        UserDetails userDetails
    ) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }


    private String buildToken(
        Map<String, Object> extraClaims,
        UserDetails userDetails,
        long expiration
    ) {
        return Jwts
            .builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }
    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts
            .parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    private Key getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    // public String generateToken(Authentication authentication){
    //     String username = authentication.getName();
    //     Date currentDate = new Date();
    //     Date expireDate = new Date(currentDate.getTime() + SecurityConstants.JWT_EXPIRATION);
    
    //     String token = Jwts.builder()
	// 			.setSubject(username)
	// 			.setIssuedAt( new Date())
	// 			.setExpiration(expireDate)
	// 			.signWith(key,SignatureAlgorithm.HS512)
	// 			.compact();
    //     return token;
    // }

    // public String getUsernameFromJWT(String token){
    //     Claims claims = Jwts.parserBuilder()
    //                 .setSigningKey(key)
    //                 .build()
    //                 .parseClaimsJws(token)
    //                 .getBody();

    //     return claims.getSubject();
    // }

    // public boolean validateToken(String token){
    //     try {
    //         Jwts.parserBuilder()
    //         .setSigningKey(key)
    //         .build()
    //         .parseClaimsJws(token);
    //         return true;
    //     } catch (Exception ex) {
    //         throw new AuthenticationCredentialsNotFoundException("JWT was exprired or incorrect",ex.fillInStackTrace());
    //     }
    // }
}
