---
title: tictoctoe game end to end app
author: Hafeez SHAIK
date: 2021-06-14 14:24:00 +0530
categories: [Tech,Tutorial,spring]
description: In this you can learn how to get java cod from APK file
tags: [microservice,architecture,java,angular]
---
## Objective
In this tutorial iam going to show how can a tipical microservice architecture can be along with real world example and codebase

## Technologies used
- Frontend
    - Angular 8
    - Angular material design v10
    - websocket
- Backend
    - spring boot 2.3.11
    - spring cloud Hoxton.SR11
    - MySql 8.0 CE
    - Redis community edition

## Architecture
Archiecture i thought of before starting the project

![Desktop View](/assets/img/post_images/how-extract-java-code-from-apk/spring-boot-architecture-design.PNG)

## Github repositories
1. [Angular frontend](https://github.com/appuhafeez/tik-tok-toe-frontend)
2. [Game backend](https://github.com/appuhafeez/tik-tok-toe-be)
3. [Game history service](https://github.com/appuhafeez/tictoctoe-history-service)
4. [Oauth2 service](https://github.com/appuhafeez/tictoctoe-oauth-server)
5. [Spring cloud services](https://github.com/appuhafeez/tictoctoe-scs)

## Spring backend services
<h2 data-toc-skip>Game backend</h2>
This service has core logic of game like calculation of winning logic, creating and destroying game's. I have used
concepts for 

1. websocket --> for real time game loading on a multiplayer environment
```xml
        <dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-websocket</artifactId>
		</dependency>
```
2. redis cache --> for faster accessibility of data and auto deletion of game data if its ideal for sometime 
```xml
        <dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-redis</artifactId>
		</dependency>
```
3. spring security resource server --> to maintain and authorize logged in users to maintain there game history 
```xml
        <dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>
```
4. feign client --> for microservices to microservice communication, feign client is a cloud service you should also have spring cloud services in your pom.xml
```xml
    <dependencyManagement>
		<dependencies>
			<dependency>
				<groupId>org.springframework.cloud</groupId>
				<artifactId>spring-cloud-dependencies</artifactId>
				<version>${spring-cloud.version}</version>
				<type>pom</type>
				<scope>import</scope>
			</dependency>
		</dependencies>
	</dependencyManagement>
```
```xml
        <dependency>
			<groupId>org.springframework.cloud</groupId>
			<artifactId>spring-cloud-starter-openfeign</artifactId>
		</dependency>
```
5. kafka --> for communication with notification service
```xml
        <dependency>
			<groupId>org.springframework.kafka</groupId>
			<artifactId>spring-kafka</artifactId>
		</dependency>
```

<h2 data-toc-skip>Game history service</h2>
This service maintains game history of authenticated users 

1. JPA --> for relational db calls it helps to remove all boiler plate code and gives simple interface to connect and execute db queries
```xml
        <dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
```
2. spring batch --> for deleting history data more than 90 months, runs every day to pick and delete records its configarable  
```xml
        <dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-batch</artifactId>
		</dependency>
```

<h2 data-toc-skip>Oauth2 service</h2>
This service authenticate and authorize users of game. This service issues JSON web tocken which will used by frontend to call other services. For every authenticated user it issues 2 token auth token(valid for 30min) and refresh token(valid for 1yr, can be used to generate more auth tokens).
1. spring security --> to authenticate and authorize users
```xml
        <dependency>
			<groupId>io.jsonwebtoken</groupId>
			<artifactId>jjwt</artifactId>
			<version>0.9.1</version>
		</dependency>
        <dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-security</artifactId>
		</dependency>
```
<h4>References</h4>

1. This repository i forked from [here](https://github.com/MaheshIare/spring-boot-jwt-security)


