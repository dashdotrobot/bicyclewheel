Title: Celebrate National Ferris Wheel Day
Date: 14 Feb 2019
Slug: national-ferris-wheel-day
Summary: It's overshadowed by Valentine's Day, but National Ferris Wheel day is a chance the celebrate our love for the enduring pleasure and intricate mechanics of large wheels.

Today, most Americans will be [thinking of their loved ones while they frantically try to book dinner reservations](https://www.chicagotribune.com/business/ct-valentines-day-history-business-20170214-story.html). In our mad-cap black-friday-esque dashes to the novelty chocolate and [bizarre couple's gifts aisle](https://www.amazon.com/His-and-Her-Tongue-Scrapers/dp/B004IG4FJE), many of us will miss an equally-important and no-less contrived holiday: __National Ferris Wheel Day__.

<img alt="George Ferris - Google Doodle" class="img-fluid" src="{filename}/images/ferris-wheel-day/google-doodle.png">
<div class="figure-caption">Google honors George Washington Gale Ferris with a <a href="https://www.google.com/doodles/valentines-day-and-george-ferris-154th-birthday" target="_blank">doodle in 2013</a>.</div>

Named for its inventor, [George Washington Gale Ferris](https://en.wikipedia.org/wiki/George_Washington_Gale_Ferris_Jr.), the [Ferris Wheel](https://en.wikipedia.org/wiki/Ferris_Wheel) was the centerpiece of the Chicago Columbian World Exposition. The "Chicago Wheel" was conceived as America's answer to the Eiffel Tower, which was considered the premier engineering marvel of the day (though widely panned as an aesthetic contribution to the Parisian skyline). Although the wheel was a financial success for the fair, Ferris himself was ruined by ensuing legal disputes regarding payment and ticket revenue. An engineering prodigy&mdash;he was only 34 when the wheel was built&mdash;Ferris died only three years after the fair from typhoid.

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

> &mdash; _W. H. Searles, Member, Civil Engineer's Club of Cleveland_

He went on to give a series of staggering sums: the rim measured 250 feet in diameter; the full weight of the wheel including passengers reached almost 3 million pounds; the spindle alone, the largest forging in the world up to that time, weighted 93 tons. Furthermore, the entire project was supervised by Ferris himself, only 12 years out of school, and the chief engineer, W. F. Gronau, only 5 years out of school.

## The Year of the Wheel

The similarity between the Chicago Wheel and its ancestor, the tensioned-spoked bicycle wheel, was not lost on fair attendees:

> "The spokes look like cobwebs; they are after the fashion of those on the newest make of bicycles."

> &mdash; Julian Hawthorne (son of Nathaniel Hawthorne)

Prior to 1869, bicycle wheels were constructed in the same fashion (and often by the same craftsmen) as carriage wheels: a heavy, wooden rim was supported by stout wooden spokes which carried the weight of the vehicle through compression. The carriage wheel was heavy and prone to failure. Its diameter was severely limited by the tendency of the spokes to buckle under compression.

The tension-spoked wheel was nothing short of revolutionary: instead of carrying compression, the spokes were given an initial tension in order to prevent them from going slack under the weight of the bike and rider. Eliminating the risk of buckling allowed the use of slender metal wire in place of the thick wooden spokes, permitting larger and lighter wheels. Practically every bicycle wheel ridden today uses this design.

Searles and his audience pondered the similarities between the bicycle wheel and the Ferris Wheel:

> _Mr. N. P. Bowler_: "I would like to know if there is anything about the construction of that wheel that would be injurious or detrimental, supposing it should be put upon the ground... Is the construction anything like our bicycles?"

> _The Chair_: "...there is nothing in the design of the wheel to prevent it from rolling on the ground..."

> _Mr. Gifford_: "Begging your pardon, I cannot agree with Mr. Porter in regard to that wheel rolling on the ground as in case of a bicycle wheel. [The Ferris Wheel] is supported in its circumference at thirty-six points. If you rest it on the ground you must rest it at one point... it would 'squash out' to use a common phrase, and the rods would break and the ring would flatten out."

## Stresses in wheels

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
    <img alt="Stresses in the Ferris Wheel" class="img-fluid" src="{filename}/images/ferris-wheel-day/old-papers.png"/>
    <div class="figure-caption">Truss analysis of the Ferris Wheel (left). Stress diagram for the Ferris Wheel (middle). A segment of a bicycle rim, with bending moments and spoke tension (right).</div>
  </div>
  <div class="col-md-2"></div>
</div>

If the weight of the truss is neglected compared with the weight of the cars, the tension in the spokes varies from zero (at the very top) to $4W$, where $W$ is the weight of a single car. Interestingly, the stresses in the spokes do not depend on the diameter of the rim or the number of cars. In order to prevent the spokes from going slack, a tension of $2W$ must be added to each spoke during construction. Ferris and his engineers accomplished this by installing turnbuckles on each spoke and adjusting them manually.

The rim is under compression everywhere. A good approximation, provided there are a sufficient number of spokes, gives the compression in the rim at the top as $NW/2\pi$, where $N$ is the number of spokes, and the compression in the rim at the bottom as $3NW/2\pi$. Unlike the spokes, the rim feels the full weight of all the cars at the bottom, and must be designed against buckling.

The stresses in the Ferris Wheel are independent of the stiffness of the spokes and rim, so long as the individual components don't fail. This makes the design rather straightforward: once you have selected the number and capacity of the cars, the spokes and rim can be designed using simple formulas. In the bicycle wheel, on the other hand, the stresses in the spokes depend on the number and stiffness of the spokes, the diameter of the wheel, and the stiffness of the rim. The stresses can't be determined from statics alone.

The first quantitative analysis of the bicycle wheel under load was given by Bernard Smith in 1901, 8 years after the fair and 32 years after the introduction of the tension-spoked bicycle wheel. He derived an approximate solution for the deformation of the rim and the stresses in the spokes by assuming that the number of spokes was large enough to be considered infinite: imagine "smearing out" the discrete spokes into a continuous disc of spokes.

He found mathematically what was already known qualitatively at the time, which is that the weight of the hub is supported by the _loss_ of tension in just a few spokes directly underneath the hub. The spokes above the hub, although still under tension, don't change in tension by more than a few percent of the applied load, leading Jobst Brandt and others to say that the hub "stands on the spokes" below it.

Since the load is supported by only a few spokes, the bottom-most spokes ends up carrying about half the total applied load (contrast with the Ferris Wheel, where the bottom spoke carries only 10% of the total weight, for a 36-spoke wheel). Adding more spokes decreases the load borne by any one spoke, but the effect is non-linear: twice the spokes does not equal half the load.

In order to carry you and your bike safely, the bottom-most spoke must not lose tension completely. Therefore, the spokes must be given an initial tension _at least_ equal to half the load on the wheel. In practice, spokes on modern wheels are usually tensioned to about 100 kgf, more than enough, generally, to support large loads from potholes or side forces. The rim must in turn bear a compressive force equal to $NT/2\pi$, where $T$ is the initial tension in each spoke. Most of the time, our bicycle wheels take on this huge responsibility without complaint, though not always, as seen below:

<img alt="buckled bicycle wheel" class="img-fluid" src="{filename}/images/ferris-wheel-day/buckled-wheel.jpg"/>

## Giant bicycle wheels

Modern Ferris wheels (more generally "Observation Wheels") tend to look more like bicycle wheels, with continuous, thickened rims, and a web of slender cables for spokes. The original Ferris Wheel depended on diagonal braces to brace the truss against the notorious Chicago gales. The hub of the Chicago Wheel was relatively wide (45.5 ft) compared with its diameter (250 ft), an aspect ratio of 18%. These modern wheels are noticeably more slender (though I was unable to find measurements of the hub widths). Under these conditions, the spokes must be designed with enough pretension so that they don't go slack when supporting wind loads.

<div class="row">
  <div class="col-md-4 mt-auto">
    <img alt="London Eye" class="img-fluid" src="{filename}/images/ferris-wheel-day/London-Eye.jpg"/>
    <div class="figure-caption">London Eye (394 ft diameter)</div>
  </div>
  <div class="col-md-4 mt-auto">
    <img alt="Signapore Flyer" class="img-fluid" src="{filename}/images/ferris-wheel-day/Singapore-Flyer.jpg"/>
    <div class="figure-caption">Signapore Flyer (492 ft diameter)</div>
  </div>
  <div class="col-md-4 mt-auto">
    <img alt="Las Vegas High Roller" class="img-fluid" src="{filename}/images/ferris-wheel-day/High-Roller.jpg"/>
    <div class="figure-caption">Las Vegas High Roller (520 ft diameter)</div>
  </div>
</div>

At larger diameters and spoke tensions, buckling of the rim becomes a concern. A bicycle wheel can "taco" under excessive tension, and large observations wheels are no different. A careful optimization routine was carried out for each to determine the necessary tension to support the rim without going slack, then the rim stiffness needed to prevent buckling, then optimizing the rim for weight and iterating the entire process again.

If you're lucky enough to live near a Ferris wheel, take a friend or lover on a leisurely spin, and enjoy Valentine's Day at the pace it was meant to be enjoyed.

> You loved ferris wheels more than roller coasters because life shouldn’t be lived at full speed, but in anticipation and appreciation.

> &mdash; Amy Harmon

#### To learn more about the mechanics of bicycle wheels:

Peruse this website, or read my [Ph.D. thesis](https://github.com/dashdotrobot/phd-thesis/releases/download/v1.0/Ford_BicycleWheelThesis_v1.0.pdf).

## References

[Ferris Wheel](https://en.wikipedia.org/wiki/Ferris_Wheel), Wikipedia.

[London Eye](https://en.wikipedia.org/wiki/London_Eye), Wikipedia.

[Singapore Flyer](https://en.wikipedia.org/wiki/Singapore_Flyer), Wikipedia.

[High Roller (Ferris wheel)](https://en.wikipedia.org/wiki/High_Roller_(Ferris_wheel)), Wikipedia.

David Lazarus, [Column: Valentine's Day, so lucrative for businesses, has a naughty history](https://www.chicagotribune.com/business/ct-valentines-day-history-business-20170214-story.html), Chicago Tribune, February 14th, 2017.

[George Washington Gale Ferris](https://en.wikipedia.org/wiki/George_Washington_Gale_Ferris_Jr.), the [Ferris Wheel](https://en.wikipedia.org/wiki/Ferris_Wheel), Wikipedia.

Johnson, Bryan, and Turneaure, [The Theory and Practice of Modern Framed Structures](https://babel.hathitrust.org/cgi/pt?id=njp.32101049950320;view=1up;seq=90;size=150), London (1895).

W.H. Searles, The Ferris Wheel, _Journal of the Association of Engineering Societies_

Discussion: Stresses in the Ferris Wheel, _Engineering News and American Railway Journal_, 31, 349–350 (1894)

B.A. Smith, The Bicycle Wheel. _Report of the Meeting of the Australasian Association for the Advancement of Science_, 8:197–203, (1901).

Jobst Brandt, The Bicycle Wheel (1993).