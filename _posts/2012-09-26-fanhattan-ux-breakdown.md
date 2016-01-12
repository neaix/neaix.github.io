---
title: Fanhattan UX Breakdown
subtitle: I love you Fanhattan, but you could use some help. This is my attempt.
layout: post
---

So, my first time doing one of these things, but I love Fanhattan and wanted to throw my opinion in. So here goes.

**The Product (iPad)**

Fanhattan is a catalogue of all  film/TV media on the web that gives consumers a single point of discovery.

You search for things, Fanhattan tells you where it lives, and you can go there and watch it. Revenue is through affiliate marketing.

What Fanhattan ultimately wants from their users is what I'm going to call an Action. Action == Watching == Affiliate Revenue.

The user experience cycle goes from what I call Discovery --> Intrigued --> Learn More, then back to Discovery. Every stage should lead to an Action.

![Fanhattan-Circle](https://s3.amazonaws.com/www.chrisyin.com/static/fanhattan-circle.png)

While Fanhattan currently follows the cycle shown above, I think the UX has drop offs at certain points, and it would be nice to see a more fluid experience that gives me the info I need when I want it, encourages me to take action, and keeps bringing me back to Discovery. (Basing this off of personal experience, opinions may change if I were to look at user data.)

Let’s focus on the movie section. We'll start at Discovery, move to Intrigued, Learn More, and then back to Discovery.

![Discovery](https://s3.amazonaws.com/www.chrisyin.com/static/fanhattan-discovery.png)

**Discovery**

The Discovery section is currently broken into 7 horizontal panes in the top half of the screen. The panes are Smart Browse, Featured, Streaming, In Theatres, My Movies, My Friends, and Genre.

7 panes is a lot to swipe through. And a few overlap, so we can consolidate. Smart Browse can already filter by Genre, so no need for a standalone Genre pane. In addition, My Movies is 3 personal lists; let's make it all part of a dropdown menu associated with the "Me" button at the top (currently useless). Finally, Featured/Streaming/My Friends all help users discover films. Let’s group those together and call it Discover. We end up with 3 simple panes—Smart Browse, Discover, and In Theatres.

Since Discover is now 3 panes in 1, we need to reorganize it. In a recent [press release](http://bit.ly/PmcZW0), Chris Thun noted that discovery is 3 things—algorithmic, curated, and social. And it makes sense; the user starts with a large list of movies, and it gets more personalized as you move from algorithmic to curated, and then even more with social. Let's reorganize the new Discovery category to reflect this.

![Pyramid](https://s3.amazonaws.com/www.chrisyin.com/static/fanhattan-pyramid.png)

1. Start with most general-- the 1st filter should be All.
2. Most of the Streaming pane is new material. Group it into a filter called New. (Hulu/Amazon/Free can all be filtered in Smart Browse already)
3. Add Popular-- for movies trending amongst all users.
4. Re-label featured as Recommended. Take what the user likes and show similar films.
5. Last is Social, which is the currently the My Friends pane.

Keep Smart Browse the same (it's awesome), and re-sort In Theatres the same way we did Discover, from general to customized. We end up with something like this:

![Fanhattan1](https://s3.amazonaws.com/www.chrisyin.com/static/fanhattan1.png)

Just 3 panes for Discovery. Browse. Discover, from general films down to user specific. In Theatres for up & coming. The same material, but no swiping, easy to navigate & understand.

Also, when we tap on movie posters,  Watch List, Seen It, Be a Fan options pop up. Let's add Watch Now at the top so the user can immediately perform an Action when they see a film they like.

**Intrigued**

If the user is unsure, they tap the movie poster and move to the Intrigued section. Currently for Intrigued, the bottom half of the screen turns into 3 columns (Photos, Watch Now, Movie Details). Tapping Discover pulls up a new screen (Learn More) with 9 separate panes (the first 3 panes are exactly the same as the columns in Intrigued).

![Intrigued](https://s3.amazonaws.com/www.chrisyin.com/static/fanhattan-intrigued.png)

The user didn't perform an Action in Discovery, and came to Intrigued to help with their decision. However, the current setup doesn't help me make a decision --  I need a bit more. And tapping any of these columns simply brings me to to the same pane in Learn More (and tapping the rating brings me to Movie Details)

Unless I was already prepared to perform an action, my decision ends up taking place in Learn More, rendering the Intrigued section almost useless.

The basic info I need is Summary, Cast & Crew, Ratings, & Trailers. Combine all the panes together, info on the left, actions on the right. Each section (Poster, Ratings, Plot Summary, Cast) should open a new window when tapped (ie tapping the critics/viewer meters will bring up the Reviews window). The user now has the requisite info and is led to perform an Action, or go back to the Discovery stage.

![Fanhattan2](https://s3.amazonaws.com/www.chrisyin.com/static/fanhattan-2.png)

**Learn More**

At this point, we've provided all the basic info a user needs to make a decision. So either the user really wants to know the the film before they perform an Action or the user has already watched the film and wants to learn more. By swiping to the right, the user moves to Learn More. Here the user can get click on News, Discussions ([Facebook](http://www.facebook.com/ThereWillBeBloodMovie), [Twitter](https://twitter.com/i/#!/search/?q=there+will+be+blood&src=typd), [GetGlue](http://getglue.com/movies/there_will_be_blood/paul_anderson), etc), or watch Clips ([MovieClips](http://movieclips.com/)).

![LearnMore](https://s3.amazonaws.com/www.chrisyin.com/static/fanattan-learnmore.png)

For the user who is still trying to make a decision, this window will tell them everything to actually watching the film. There is no more information we can provide-- the user will now either perform an Action (Watch Now in the top right), or reject the movie and go back to Discovery (click off the window).

The user who has already seen the film and wants to learn more has already performed an Action; we want to lead them back to Discovery. If they come this far for news/discussions/clips, I think it is safe to assume they at least mildly enjoyed the film. The user can then slide to the right and see an entire window of related films (categorized by Genre/Actors/Directors, etc) and this leads them back to the Discovery stage.

![Related](https://s3.amazonaws.com/www.chrisyin.com/static/fanhattan-related.png)

**Conclusion**

The user now consistently gains more info at every stage (Discovery, Intrigued, Learn More) and can perform an action at every step. And at the end, we lead them back to Discovery to start the cycle over, creating a continually engaging experience.

Overall, Fanhattan is still amazing -- just my 2 cents.