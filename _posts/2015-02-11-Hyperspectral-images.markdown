---
layout: post
title:  "Tutorial : Reading Hyperspectral Images"
date:   2015-11-20 20:21:21
categories: Tutorial
tags: Python Hyperspectral Image Processing
image: /assets/images/antivj10.jpg
permalink: /hyperspectralimage/
---
Introduction
=============
I have been working with hyperspectral images for a long time now and these are some of the things I wish I knew when I started with this subject. Will not deny it was fun experimenting and experiencing some "Whoa!" moments. Will try my best to keep this post as simple as possible. I will assume that you have basic knowledge of python.
###So what is a Hyperspectral Image?
>Hyperspectral imaging, like other spectral imaging, collects and processes information from across the electromagnetic spectrum. The goal of hyperspectral imaging is to obtain the spectrum for each pixel in the image of a scene, with the purpose of finding objects, identifying materials, or detecting process.

That was straight from Wikipedia.
All you need to know is that if a normal image in matrix form has rows and columns. Hyperspectral images have rows, columns and bands and each point/pixel has its own associated spectrum (Mind = Blown!). So basically it allows normal human eyes to see the unseen (Visible + Infrared + Ultraviolet). Pretty sweet isn't it?

Hyperspectral images contain a wealth of data, but interpreting them requires an understanding of exactly what properties of ground materials we are trying to measure, and how they relate to the measurements actually made by the hyperspectral sensor.

Speaking of hyperspectral sensor AVIRIS, Airborne Visible/Infrared Imaging Spectrometer from NASA has acquired images of Cuprite, Nevada which are widely used for studying hyperspectral images. We will be using Cuprite images available free for download [here](http://aviris.jpl.nasa.gov/data/free_data.html)

Let's Get Started
===================
Just to let you know that hyperspectral images can be read through software like ENVI, ERDAS imagine which of course is not free. 

We use Python! Free and Open Source!

The dependencies you will need

-	Spectral (Spy).
-	Numpy.
-	Pylab.
-	PIL.
-	matplotlib.

We will be using IPython Notebook. (That was very obvious)

You can download all the above by running

`$ pip install <dependency name>`

in your command line.

Once you are done installing all the above run 

 `$ ipython notebook --pylab`

This will enable pylab and start IPython in your default browser. Navigate to the folder where you have downloaded the image and open a new Notebook.

The Code
===========
{% highlight python %}
import spectral
import numpy
import PIL
import matplotlib
{% endhighlight %}
This is self explanatory.
{% highlight python %}
img = aviris.open('f970619t01p02_r02_sc01.a.rfl','f970619t01p02_r02.a.spc')
{% endhighlight %}
Here we are reading the image into `img` variable, since `aviris.open` is a function of spectral library. This function will change based upon the hyperspectral image you will be using.
If it is .int extension then you use `envi.open`. Similarly if it is .lan then you use `erdas.open`

The .a.rfl extension contains the actual image and .a.spc contains the data of the bands. If you get an error here the only possible reason will be you are not in the path of the image.

To know if the data has been read just type in

`img` 

and execute and you should get something like this
{% highlight python %}
 Data Source:   './f970619t01p02_r02_sc01.a.rfl'
	# Rows:            512
	# Samples:         614
	# Bands:           224
	Interleave:        BIP
	Quantization:  16 bits
	Data format:     int16

{% endhighlight %}

So now you have a clear cut picture of what's in store for you. The first 3 are understood.
Interleave can be of 3 type `BIP`, `BIL`, `BSQ`. I will explain this in detail in an other post as of now just know that Band interleaved by line (BIL), band interleaved by pixel (BIP) and band sequential (BSQ) are the ways of storing or should I say organizing the data by line, pixel or sequentially.

>Every hyperspectral image will have a .hdr file associated with it. These are header files and contain the information about the various parameters/data about the image. Understanding header files will give you a good knowledge about the image. The file can be read by using TextEdit on a mac and i guess Notepad on windows would do a good job too.

Now let us load this into another variable. Execute

`abc = img.load()`

To check the data in `abc`

`abc.info()`

should output this
{% highlight python %}
u'\t# Rows:            512\n\t# Samples:         614\n\t# Bands:           224\n\tData format:   float32'
{% endhighlight %}

Note that the data format has changed from *int16* to *float32*. I really do not know why this happens but after breaking my head I found out we can actually convert the result back into int16 infact any datatype that you want. Thanks to numpy.

Now type in

`abc`

and execute and that's the entire Hyperspectral image in matrix form!
{% highlight python %}
[[[ 0.          0.          1.03670001 ...,  0.18799999  0.2414      0.2516    ]
  [ 0.          0.          1.03670001 ...,  0.13349999  0.1662      0.13240001]
  [ 0.          0.          1.03690004 ...,  0.18539999  0.1793      0.16320001]
  ..., 
  [ 0.          0.          0.98760003 ...,  0.1175      0.0937      0.0411    ]
  [ 0.          0.          1.         ...,  0.1221      0.1649      0.1714    ]
  [ 0.          0.          0.9874     ...,  0.14040001  0.13        0.1503    ]]

 [[ 0.          0.          0.0086     ...,  0.21520001  0.1631      0.1936    ]
  [ 0.          0.          0.0086     ...,  0.28619999  0.219       0.2757    ]
  [ 0.          0.          0.0086     ...,  0.13249999  0.1649      0.1101    ]
  ..., 
  [ 0.          0.         -0.005      ...,  0.0931      0.0777      0.0428    ]
  [ 0.          0.         -0.005      ...,  0.0684      0.0597      0.0963    ]
  [ 0.          0.         -0.005      ...,  0.19419999  0.14650001  0.1762    ]]

 [[ 0.          0.         -0.005      ...,  0.16339999  0.1639      0.1094    ]
  [ 0.          0.         -0.005      ...,  0.18279999  0.19840001  0.2242    ]
  [ 0.          0.         -0.005      ...,  0.2186      0.2395      0.22849999]
  ..., 
  [ 0.          0.         -0.005      ...,  0.1187      0.16689999  0.1479    ]
  [ 0.          0.         -0.005      ...,  0.0445      0.0444      0.1241    ]
  [ 0.          0.         -0.005      ...,  0.1469      0.12710001  0.1186    ]]

 ..., 
 [[ 0.          0.         -0.005      ...,  0.1635      0.1406      0.1665    ]
  [ 0.          0.         -0.005      ...,  0.121       0.1401      0.0971    ]
  [ 0.          0.         -0.005      ...,  0.2062      0.1237      0.16689999]
  ..., 
  [ 0.          0.         -0.005      ...,  0.23469999  0.2273      0.24590001]
  [ 0.          0.         -0.005      ...,  0.25619999  0.1961      0.1892    ]
  [ 0.          0.         -0.005      ...,  0.1538      0.1699      0.1832    ]]

 [[ 0.          0.         -0.005      ...,  0.13959999  0.1596      0.1245    ]
  [ 0.          0.         -0.005      ...,  0.13959999  0.17120001  0.1245    ]
  [ 0.          0.         -0.005      ...,  0.163       0.1573      0.17470001]
  ..., 
  [ 0.          0.         -0.005      ...,  0.1367      0.1591      0.1373    ]
  [ 0.          0.         -0.005      ...,  0.1086      0.14650001  0.0896    ]
  [ 0.          0.         -0.005      ...,  0.1489      0.13940001  0.1134    ]]

 [[ 0.          0.         -0.005      ...,  0.2071      0.1648      0.1416    ]
  [ 0.          0.         -0.005      ...,  0.1234      0.1196      0.1427    ]
  [ 0.          0.         -0.005      ...,  0.14219999  0.1389      0.1709    ]
  ..., 
  [ 0.          0.         -0.005      ...,  0.1052      0.1165      0.1056    ]
  [ 0.          0.         -0.005      ...,  0.1561      0.153       0.1569    ]
  [ 0.          0.         -0.005      ...,  0.1318      0.12809999  0.1049    ]]]
{% endhighlight %}

Note that 0. in the matrix doesn't mean that the value is 0. It has a value which is very small and negligible.

To get the desired row, column and band use

`arr[56:60,56:60,23].astype(numpy.float32)`

and it should output this

{% highlight python %}
[[ 0.2221      0.23019999  0.2228      0.2008    ]
 [ 0.24079999  0.2078      0.19159999  0.18880001]
 [ 0.1934      0.18960001  0.1908      0.19230001]
 [ 0.1885      0.1908      0.1868      0.19149999]]
{% endhighlight %}

In the above example we read the matrix values from 56-60 rows, 56-60 columns and of 23rd band. 
`.astype(numpy.float32)` is how to change the datatype of the matrix.

Lastly i will be showing you how you can view the Hyperspectral Image and see the spectrum.

To view the hyperspectral image type in

`showimage = imshow(img, (5, 200, 200))`

now in a new window you will be able to see something like this

![Cuprite](/assets/images/hyperspectralimage.png)


To get the data limit values of RGB for the value that you have entered in, execute

`print view`

and you will see
{% highlight python%}
ImageView object:
  Display bands       :  (5, 200, 200)
  Interpolation       :  <default>
  RGB data limits     :
    R: [0.054699999999999999, 0.2167]
    G: [0.068400000000000002, 0.4829]
    B: [0.068400000000000002, 0.4829]
{% endhighlight %}

Play around by changing the bands and you will see the color of the image will change. In the beginning I had mentioned that each band is associated with a wavelength and each point/pixel has its own spectrum. *Don't believe me?* Double click on any point on the image and you will see the spectrum graphically plotted.

![Spectral Plot](/assets/images/graph.png)

That is Hyperspectral Image.

For any doubts feel free to comment or drop a mail to _rajathkumar.exe@gmail.com_ 

Peace.





