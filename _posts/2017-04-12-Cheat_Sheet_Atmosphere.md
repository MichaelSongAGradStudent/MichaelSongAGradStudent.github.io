---
layout: post
title: "On XSEDE and Atmosphere"
date: 2017-04-12
---
# Starting Off

[Here's how to get an account and request resources](https://iujetstream.atlassian.net/wiki/display/JWT/Jetstream+Allocations)
Great! Now you have an account!

## Atmosphere
Let's log into [Atmosphere on Jetstream](https://auth.globus.org/p/login?redirect_uri=%2Fv2%2Foauth2%2Fauthorize%3Fscope%3Dopenid%2Bemail%2Bprofile%2Burn%253Aglobus%253Aauth%253Ascope%253Ause.jetstream-cloud.org%253Aall%26redirect_uri%3Dhttps%253A%252F%252Fuse.jetstream-cloud.org%252Foauth2.0%252FcallbackAuthorize%26response_type%3Dcode%26client_id%3D0bf57b67-5f5c-4b45-be39-6dbf136dcca8%26access_type%3Donline%26authentication_hint%3D36007761-2cf2-4e74-a068-7473afc1d054&client_id=0bf57b67-5f5c-4b45-be39-6dbf136dcca8)
Cool.

#### We're going to launch an instance which is like a computer in the cloud.
<img src="/images/AT1.jpg" alt="I am the fern">

#### This one is good. Note the different stuff it already has loaded onto it.
<img src="/images/AT2.jpg" alt="I am the fern">

#### You can make a project and add this instance to the project.
<img src="/images/AT3.jpg" alt="I am the fern">

#### Pick the size you need and launch!
<img src="/images/AT4.jpg" alt="I am the fern">

#### Once the instance is active, you can launch a web shell to work on it.
<img src="/images/AT5.jpg" alt="I am the fern">

#### Nice work!
<img src="/images/AT6.jpg" alt="I am the fern">

## Accessing your iPlant data
So this is pretty chill. But we need to get the data from our other cloud. We've been using the [Discovery on Cyverse](https://de.cyverse.org/de/)

#### Let's log on and find where our stuff is...
<img src="/images/AT7.jpg" alt="I am the fern">

Great now let's set up iRODS

### Here's the bread and butter:
$ iinit

Enter the host name (DNS) of the server to connect to:data.iplantcollaborative.org

Enter the port number:1247

Enter your irods user name: (YOUR UN)

Enter your irods zone:iplant

Enter your current iRODS password: (YOUR PWD)


### And now you can use the commands:

iget PATHTOFILE

iput PATHTOFILE

to grab and put stuff to your CyVerse cloud.

