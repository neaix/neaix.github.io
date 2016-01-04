---
layout: post
title:  "Principal Component Analysis, Reconstruction"
date:   2015-07-12 20:21:21
categories: Guide
tags: PCA Reconstruction
permalink: /pca/reconstruction
---

##Prologue
I would assume that you already have understood PCA. If you haven't, Then you can read about it [here.](http://www.rajathkumar.com/pca/). In this post you will learn about recovering back the original data from the transformed data. I will be using the same terminologies as I have used in the previous post, [Mathematically, Principal Component Analysis](http://www.rajathkumar.com/pca/)

##Introduction
PCA, As we have understood before transforms the given data into new data by taking into consideration it's importance, i.e. Eigen Values. Recall the equation

$$Findata = featuremat \times datam$$

Where _Findata_ is the final transformed data, _feauturemat_ is the matrix containing eigen vectors with the highest eigen vector in the first row and second highest in the second row and so on, Finally _datam_ is the original given data under consideration.

##Reconstruction

To get _datam_, the above equation can be rewritten as

$$datam = {featuremat}^{-1} \times Findata$$

Now _feauturemat_ contains the eigen vectors. If these vectors are unit vectors then the inverse of the matrix is nothing but the transpose of the matrix. But if it is not then the above statement is not true. Note that in most of the cases most of the math libraries will output unit eigen vectors. I will be considering the eigen vectors so obtained are unit vectors. Now the equation becomes

$$datam = {featuremat}^{T} \times Findata$$

But _datam_ is 0 mean data. i.e. mean subtracted data. (Recall from previous post). Hence

$$datam = Originaldata - Mean$$

Substituting this in the previous equation

$$Originaldata - Mean = {featuremat}^{-1} \times Findata$$

Thus _Originaldata_ is expressed as

$$Originaldata = ({featuremat}^{-1} \times Findata) + Mean$$

Peace.