---
title: How to extract java code from apk
author: Hafeez SHAIK
date: 2020-10-24 14:24:00 +0530
categories: [Tech,Tutorial]
description: In this you can learn how to get java cod from APK file
tags: [Android,apk,java]
---

## Objective

In the tutorial we are going through how we can extract java code from apk file

## Tools Required

1. [APK Tool](https://ibotpeaches.github.io/Apktool/install/)
2. [JD-GUI](https://github.com/java-decompiler/jd-gui/releases)
3. [dex2jar](https://sourceforge.net/projects/dex2jar/)


### Lets get into command part

- <h3 data-toc-skip>Extracting apk data</h3>
  - ``` apktool.jar d <name_of_apk>.apk ```
  > **Note**: The folder generated contain everything other than Java files will go to java in next step
- <h3 data-toc-skip>Converting apk to jar</h3>
  - ``` d2j-dex2jar <name_of_apk>.apk ```
  - This above command converts apk file to jar file
- <h3 data-toc-skip>Opening java source code</h3>
  - Now use jd-gui by double clicking or running `java -jar <jd-gui-file-name>.jar`
  - Now press ` ctrl+o ` and select converted jar file
  - You can see all packages and class files, when you click on each file the source code will open 
  - your screen will be similar as below

### Output

![Desktop View](/assets/img/post_images/how-extract-java-code-from-apk/Capture.PNG)

Let me know your thoughts in comments section below

