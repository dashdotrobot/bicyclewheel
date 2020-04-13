Title: Rim Stiffness
Authors: Matthew Ford
Slug: rim-stiffness
JavaScripts: datatables.min.js, wheel-app-constants.js, rimtable.js
Stylesheets: datatables.min.css
Show_in_menu: true

A sturdy wheel depends on a sturdy rim.
The rim serves several purposes: it seats the tire, keeps the spokes under tension, distributes external forces to the spokes, and (in the case of rim brakes) stops the bicycle.
From a structural standpoint, we mostly care about the __stiffness__ of the rim, or its ability to resist changes in shape. The rim has a different stiffness for each of the ways it can change shape.

The __axial stiffness__ resists changes in the total length (circumference) of the rim.
It determines how much the total rim circumference changes when all the spokes are evenly tightened or the tire is inflated.
Other than these two cases, it doesn't really play an important role because it's so much larger than the other stiffness (you can easily bend a rim over you knee and see the lateral deformation, but you couldn't pull inwards on the rim and expect to notice any real change in circumference).

The other three deformation modes are illustrated below on a short rim section:

<div class="container">
<div class="row">
	<div class="col-md-4">
		<h5>Radial bending</h5>
		<img alt="Radial bending" class="img-fluid" src="{filename}/images/rim-stiffness/rim-radial.gif">
	</div>
	<div class="col-md-4">
		<h5>Lateral bending</h5>
		<img alt="Bicycle wheel coordinate system" class="img-fluid" src="{filename}/images/rim-stiffness/rim-lateral.gif">
	</div>
	<div class="col-md-4">
		<h5>Torsion</h5>
		<img alt="Bicycle wheel coordinate system" class="img-fluid" src="{filename}/images/rim-stiffness/rim-torsion.gif">
	</div>
</div>
</div>

The __radial stiffness__ resists "squashing" of the rim in the vertical plane.
It determines how much the rim squashes under weight and how widely the rim distributes force to the spokes underneath the hub.
The higher the radial stiffness, the more spokes will share the load and the less likely the bottom spoke is to buckle.

The __lateral stiffness__ resists sideways bending.
It controls how much the rim deforms under side forces.
Together with the torsional stiffness, it also keeps the rim flat under large spoke tensions.

The __torsional stiffness__ resists twisting of the rim around its circumference.
This is __not the same__ as the torsional (or wind-up stiffness) of the wheel, which resists rotation of the rim relative to the hub (around the axle).
It also controls how much the rim deforms under side forces.
The torsional stiffness is generally much smaller than the lateral stiffness, and because the more flexible mode dominates, it is generally much more important for the overall wheel stiffness than the rim lateral stiffness.

## Rim stiffness library

The stiffness properties of the rims below have been measured using the [acoustic measurement technique](https://rdcu.be/GPFI) developed by Ford, Peng, and Balogun. The values have been rounded to convenient values.

<table id="rimtable" class="table table-striped table-hover table-sm">
	<thead>
		<tr>
			<td>Rim</td>
			<td>Size</td>
			<td>Mass [g]</td>
			<td>Radial</td>
			<td>Lateral</td>
			<td>Torsional</td>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>
