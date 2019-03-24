Title: What can mechanics teach us about wheel truing?
Date: 19 Feb 2019
Slug: wheel-truing
Featured:
Summary: 

If you aspire to do your own bike maintenance, chances are you've tried to true your own wheels, or you want to learn how. Maybe you've tried, but weren't satisfied with the results. Either way, you may have been told that truing is one of the [trickiest](https://www.sheldonbrown.com/tooltips/truing.html) repair jobs a mechanic must learn, or that the wheel is one of the [Great Mysteries](https://www.wheelfanatyk.com/blog/wheel-building-tip-no-5-be-a-wheel-whisperer/) upon which even the Master must meditate.

Despite the mystique, plenty of riders learn to true their own wheels by following a simple set of guidelines:

* Be patient
* Inspect the wheel first
* Pay attention to spoke tension
* Start with small corrections, and check your work
* Make corrections to either radial, or lateral, but not both at the same time.
* Be patient
* Be patient

By following a simple algorithm of "find the worst spot and adjust it next," most errors can be corrected. How does the process work, and what can mechanics tell us about how wheels respond to adjustment?

##### Using the Wheel App to simulate wheel truing

The Wheel App can show you what happens when you adjust spokes. After you've designed your wheel, click on the __Forces__ tab, delete everything in the forces table, and add spoke adjustments in the adjustments table below. Spoke number 1 is the bottom-most spoke in the polar plot, or the center spoke in the column plot.

<img class="img-fluid" alt="Screenshot of the app showing results for tightening a single spoke." src="{filename}/images/wheel-truing/wheel-truing-screenshot.png" />
<div class="figure-caption">Screenshot of the app showing results for tightening a single spoke.</div>

### What happens when you adjust a spoke?

The spoke is held in the rim by the spoke nipple, which is threaded onto the end of the spoke. When you tighten a spoke, you are really moving the nipple towards the hub, pulling the rim along with it.

> Pro-tip: Never forget which direction to turn to tighten the spoke: if you want __tight__, think __right__: Give a thumbs-up with your __right__ hand and point your thumb along the spoke towards the hub. Follow your fingers to __tighten__ the spoke. If you want __loose__, think __left__: point your __left__ thumb along the spoke towards the hub and follow your fingers to __loosen__ the spoke. This is always easier than trying to think of the nipple as a nut, and remember which direction to turn to "tighten" it towards the hub.

![Spoke adjustment rule of Thumb]()

Two things happen to the spoke when you adjust the nipple: __(1)__ the __unstressed__ length of the spoke changes (the length the spoke _would_ be if the ends weren't held by the hub and rim), and __(2)__ the rim deforms under the additional tension. The change in spoke tension is a function of both effects:

$$\Delta T = K_s(\delta - u \sin{\alpha} - v \cos{\alpha})$$

$\delta = 0.454 N$ is the change in unstressed length in millimeters, where $N$ is the number of turns of the nipple (for a standard 56 thread-per-inch spoke thread), $u$ and $v$ are the __lateral displacement__ and __radial displacement__ of the spoke nipple, respectively, and $\alpha$ is the lateral bracing angle of the spoke which depends on the hub width. $K_s$ is the stiffness of the spoke (higher for larger and shorter spokes).

What does this equation tell us? Shortening the unstressed length tightens the spoke (the $\delta$ term), but the rim moves towards the spoke you adjusted, which loosens the spoke. The change in tension would be greater in a wheel with a stiff rim than in a wheel with a flexible rim. Even though the inward _radial_ displacement $v$ is generally much smaller than the lateral displacement $u$, the radial displacement has a larger effect on the tension because $\alpha$ is usually rather small (and therefore $\cos{\alpha} > \sin{\alpha})$.

To summarize:

* When you turn a spoke nipple in the _tightening_ direction, the spoke gets shorter and tighter.
* The stiffer the spoke, the greater the change in spoke tension.
* The stiffer the rim, the lesser the change in spoke tension.

#### What happens to the rim?

When you tighten a single spoke, the rim deforms in the same way as if you had applied a force in the direction of the spoke: inwards and slightly towards that spoke's hub flange. The rim is pulled inwards, and towards the side of the spoke you tightened. This creates a lateral "wave" and a radial "bump" near the spoke.

<img class="img-fluid" alt="Rim deformation" src="{filename}/images/wheel-truing/deformation-single-spoke.png" />
<div class="figure-caption">Rim deformation due to tightening a single spoke.</div>

The radial bump is confined to a very small area, perhaps only 1-3 spokes wide. The lateral wave, on the other hand, extends over a wide arc, on the order of 8-12 spokes on a 36-spoke wheel. The stiffer the rim, the wider the arc. Even further away from the main wave, the rim bends in the opposite direction as the tightened spoke, like a lopsided spinning potato chip.

If the spokes are "crossed," (they are crossed in almost all wheels) the adjustment also causes the rim to rotate in the direction of the tightened spoke. Tightening a pulling spoke rotates the rim clockwise when viewed from the drive side. These ripples are too small to measure or worry about in the rim, but they do have an effect on the spoke tensions.

#### What happens to the other spokes?

Only the two spokes directly adjacent to the adjusted spoke feel the effect of the radial bump. These spokes get shorter and therefore lose tension.

Further away from the bump, the lateral wave causes the spokes on the same as the wave to loosen and the spokes on the opposite side of the wave to loosen.

The rotation of the rim causes other pulling spokes to loosen and pushing spokes to tighten, which in turn pulls the rim inwards and outwards, creating a small rippling effect around the rim.

<!-- <img class="img-fluid" alt="Change in tension" src="{filename}/images/wheel-truing/tension-components.png" /> -->
<!-- <div class="figure-caption">Change in spoke tensions due to different effects. Units in kilogram-force.</div> -->

<div class="row">
  <div class="col-sm-4 text-center">
    <h6>Radial effect</h6>
    <img class="img-fluid" alt="Radial effect on tension" src="{filename}/images/wheel-truing/tension-components-v.png">
  </div>

  <div class="col-sm-4 text-center">
    <h6>Lateral effect</h6>
    <img class="img-fluid" alt="Lateral effect on tension" src="{filename}/images/wheel-truing/tension-components-u.png">
  </div>

  <div class="col-sm-4 text-center">
    <h6>Rotation effect</h6>
    <img class="img-fluid" alt="Rotation effect on tension" src="{filename}/images/wheel-truing/tension-components-w.png">
  </div>
</div>

<div class="text-center">
  <h5>Total effect on spoke tensions</h5>
  <img class="img-fluid" alt="Total effect on spoke tension" src="{filename}/images/wheel-truing/tension-components-total.png">
</div>


## Making independent corrections

