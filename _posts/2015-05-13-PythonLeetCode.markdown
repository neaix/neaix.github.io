---
layout: post
title: "LeetCode In Python" 
comments: true
share: true
tags: Python
---


## Merge Sorted Array ##

Given two **sorted** integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

Note:

You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2. The number of elements initialized in nums1 and nums2 are m and n respectively.

注意：给的两个List是已经排序好了的！！！

	class Solution:
	    # @param {integer[]} nums1
	    # @param {integer} m
	    # @param {integer[]} nums2
	    # @param {integer} n
	    # @return {void} Do not return anything, modify nums1 in-place instead.
	    def merge(self, nums1, m, nums2, n):
	        i,j,k=m-1,n-1,m+n-1
	        while i>=0 and j>=0:#直到一个列表为空时停止
	            if(nums2[j]>nums1[i]):#两组列表最后个元素比较
	                nums1[k]=nums2[j]#取较大的为nums1的第k位元素（k初始为最后一位）
	                j-=1
	            else:
	                nums1[k]=nums1[i]
	                i-=1
	            k-=1
	        while j>=0:
	            nums1[k]=nums2[j]
	            j-=1
	            k-=1



----------

## Substring with Concatenation of All Words  ##：

You are given a string, s, and a list of words, words, that are all of the same length. Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once and without any intervening characters.

For example, given:

	s: "barfoothefoobarman"
	words: ["foo", "bar"]

You should return the indices: 
	
	[0,9]

(order does not matter).

Translate:

给字符串S，和一个单词的数组L，L中所有单词的长度固定。返回这样的下标，从该下标开始有且仅有L中的每一个单词，而且单词之间没有任何的间隔。

例如上面例程中，

下标0开始之后6位都连续全部包含words中的单词

下表9开始后的6位都连续全部包含words中的单词

	class Solution:
	    # @param S, a string
	    # @param L, a list of string
	    # @return a list of integer
	    def findSubstring(self, S, L):
	        lenS = len(S); lenL = len(L); lenWord = len(L[0])
	        res = []
	        for start in xrange(lenS - lenWord * lenL + 1):#start相当于开始获取子串的点
	            listS = [S[i : i + lenWord] for i in xrange(start, start + lenL * lenWord, lenWord)]
	        #lenWord是步长，上式生成(start)到(start+字长)的一个listS，listS的每个元素都是S的子串
	            found = True
	            for item in L:
	                if item in listS: #这个成立只代表匹配到了一个而已，匹配完后删去
	                #注意，只有当全部都能在子串集中匹配时，才能是True
					#
	                    listS.remove(item)
	                else:
	                    found = False
	                    break
	            if found: res.append(start)
	        return res


