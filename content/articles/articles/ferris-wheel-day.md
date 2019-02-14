Title: Celebrate National Ferris Wheel Day
Date: 14 Feb 2019
Slug: ferris-wheel-day
Summary: It's overshadowed by Valentine's Day, but National Ferris Wheel day is a chance the celebrate our love for the enduring pleasure and intricate mechanics of large wheels.

Today, most Americans will be [thinking of their loved ones while they frantically try to book dinner reservations](https://www.chicagotribune.com/business/ct-valentines-day-history-business-20170214-story.html). In our mad-cap black-friday-esque dashes to the novelty chocolate and [bizarre couple's gifts aisle](https://www.amazon.com/His-and-Her-Tongue-Scrapers/dp/B004IG4FJE), many of us will miss an equally-important and no-less contrived holiday: __National Ferris Wheel Day__.

<img alt="George Ferris - Google Doodle" class="img-fluid" src="{filename}/images/ferris-wheel-day/google-doodle.png">
<div class="figure-caption">Google honors George Washington Gale Ferris with a <a href="https://www.google.com/doodles/valentines-day-and-george-ferris-154th-birthday" target="_blank">doodle in 2013</a>.</div>

Named for its inventor, [George Washington Gale Ferris](https://en.wikipedia.org/wiki/George_Washington_Gale_Ferris_Jr.), the [Ferris Wheel](https://en.wikipedia.org/wiki/Ferris_Wheel) was the centerpiece of the Chicago Columbian World Exposition. The "Chicago Wheel" was conceived as America's answer to the Eiffel Tower, which was considered the premier engineering marvel of the day (though almost universally panned as an aesthetic contribution to the Parisian skyline). Although the wheel was a financial success for the fair, Ferris himself was ruined by ensuing legal disputes regarding payment and ticket revenue. An engineering prodigy--he was only 34 when the wheel was built--Ferris died only three years after the fair from typhoid.

<div class="row">
  <div class="col-md-2"></div>
  <div class="col-md-8">
    <img alt="Ferris Wheel" class="img-fluid" src="{filename}/images/ferris-wheel-day/Ferris-wheel.jpg" />
    <div class="figure-caption">George Ferris' original wheel, also known as The Chicago Wheel.</div>
  </div>
  <div class="col-md-2"></div>
</div>

From the beginning, the engineering community was awed by the wheel. Speaking before a conference of engineers in 1893, William H. Searles summarized what was publicly known about the wheel and its construction.

> "The most conspicuous object that greets the eye of the traveler as he approaches the grounds of the Columbian Exposition from the south, or upon the elevated railroad from the north, is the now world renowned Ferris wheel. Its great circles described by day magnificent ellipses upon the sky, or by night shining with their myriad electric lights, they appear like a galaxy of stars..."

> "But it is not to the esthetic qualities of the wheel that I would call your attention particularly at this time. We are more concerned in the design of this structure as a work of engineering, and in the method of its erection. No complete description has been given to the public by the designers. On the contrary, when applied to, they have politely declined to furnish very much information."

> _W. H. Searles, Member, Civil Engineer's Club of Cleveland_

He went on to give a series of staggering sums: the rim measured 250 feet in diameter; the full weight of the wheel including passengers reached almost 3 million pounds; the shaft alone, the largest forging in the world up to that time, weighted 93 tons. Furthermore, the entire project was supervised by Ferris himself, only 12 years out of school, and the chief engineer, W. F. Gronau, only 5 years out of school.

### The Bicycle Wheel

The similarity between the Chicago Wheel and its young ancestor, the tensioned-spoked bicycle wheel, was not lost on fair attendees:

> "The spokes look like cobwebs; they are after the fashion of those on the newest make of bicycles"

> Julian Hawthorne (son of Nathaniel Hawthorne)

Prior to 1869, bicycle wheels were constructed in the same fashion (and often by the same craftsmen) as carriage wheels: a heavy, wooden rim was supported by stout wooden spokes which carried the weight of the vehicle through compression. The carriage wheel was heavy and prone to failure. Its diameter was severely limited by the tendency of the spokes to buckle under compression.

The tension-spoked wheel was nothing short of revolutionary: instead of carrying compression, the spokes were given an initial tension in order to prevent them from going slack under the weight of the bike and rider. Eliminating the risk of buckling allowed the use of slender metal wire in place of the thick wooden spokes, permitting larger and lighter wheels. Practically every bicycle wheel ridden today uses this design.

Searles and his audience pondered the similarities between the bicycle wheel and the Ferris Wheel:

> _Mr. N. P. Bowler_: "I would like to know if there is anything about the construction of that wheel that would be injurious or detrimental, supposing it should be put upon the ground... Is the construction anything like our bicycles?"

> _The Chair_: "...there is nothing in the design of the wheel to prevent it from rolling on the ground..."

> _Mr. Gifford_: "Begging your pardon, I cannot agree with Mr. Porter in regard to that wheel rolling on the ground as in case of a bicycle wheel. [The Ferris Wheel] is supported in its circumference at thirty-six points. If you rest it on the ground you must rest it at one point... it would 'squash out' to use a common phrase, and the rods would break and the ring would flatten out."

### Stresses in the Ferris Wheel

Unlike in the bicycle wheel, the forces on the Ferris Wheel are distributed around its circumference, as Mr. Gifford noted above. The rim acts like two connected arches: the weight of the cars is channeled downwards through the compressive force in the rim, becoming larger and larger until we reach the bottom.

<div class="row">
  <div class="col-md-2"></div>
  <div class="col-md-8">
    <img alt="Ferris Wheel force diagram" class="img-fluid" src="{filename}/images/ferris-wheel-day/basic-force-diagram.png"/>
    <div class="figure-caption">Forces in the Ferris Wheel.</div>
  </div>
  <div class="col-md-2"></div>
</div>

A solution for the stresses in the Ferris Wheel was first given by J. W. Schaub in 1893, and reprinted in The Theory and Practice of Modern Framed Structures by Johnson, Bryan, and Turneaure (1895). A very elegant solution can be found using the [Method of Sections](https://en.wikibooks.org/wiki/Statics/Method_of_Sections).

<div class="row">
  <div class="col-md-2"></div>
  <div class="col-md-8">
    <img alt="Stresses in the Ferris Wheel" class="img-fluid" src="{filename}/images/ferris-wheel-day/strain-diagram.png"/>
    <div class="figure-caption">Truss analysis of the Ferris Wheel</div>
  </div>
  <div class="col-md-2"></div>
</div>

If the weight of the truss is neglected compared with the weight of the cars, the tension in the spokes varies from zero (at the very top) to $4W$, where $W$ is the weight of a single car. Interestingly, the stresses in the spokes do not depend on the diameter of the rim or the number of cars. In order to prevent the spokes from going slack, a tension of $2W$ must be added to each spoke during construction. Ferris and his engineers accomplished this by installing turnbuckles on each spoke and adjusting them manually.

The rim is under compression everywhere. A good approximation, provided there are a sufficient number of spokes, gives the compression in the rim at the top as $NW/2\pi$, where $N$ is the number of spokes, and the compression in the rim at the bottom as $3NW/2\pi$. Unlike the spokes, the rim feels the full weight of the structure at the bottom, and must be designed against buckling.
