Title: Instructions
Authors: Matthew Ford
Slug: instructions
Show_in_menu: true

## How to use the Bicycle Wheel App

The Bicycle Wheel App is a tool for designing and simulating a virtual bicycle wheel. Calculate stiffness, mass, rotating inertia, and see how spoke tensions change when the wheel is subjected to forces.

### Designing your wheel

Design your wheel using the options in the left panel.

#### Rim tab

You may choose from a short list of rims which have already been characterized, or design your own from scratch. The app does not perform any checks to ensure that your rim is feasible. For guidance on the values below, try choosing some presets to see what values they have.

__Material__: The material sets the _density_, the [_Young's modulus_](https://en.wikipedia.org/wiki/Young%27s_modulus), and [_shear modulus_](https://en.wikipedia.org/wiki/Shear_modulus). The density, together with the wheel size and mass, determines the cross-sectional area of the rim. The cross-sectional area generally has a very small effect on the mechanical behavior. The Young's modulus and shear modulus are already incorporated into the bending stiffnesses, and therefore have no direct effect on the mechanical behavior of the wheel.

__Wheel Size__: Select from a list of standard wheel sizes. This determines the _radius_ of the rim. All else held equal, small wheels are inherently stiffer and stronger than large wheels.

__Mass__: The mass of the rim has a negligible effect on the mechanical properties (unless it is very small), but has a large effect on the inertial properties of the wheel.

__Radial stiffness__: The radial bending stiffness is the resistance of the rim cross-section to bending within its initial plane (think of a rim being squashed top-to-bottom). It is the product of the Young's modulus and the [second moment of area](https://en.wikipedia.org/wiki/Second_moment_of_area) of the rim cross-section in the radial direction. Deep rim sections have a higher radial stiffness than shallow rim sections.

__Lateral stiffness__: The lateral bending stiffness is the resistance of the rim cross-section to bending out of its initial plane (think of a rim being bent sideways). The lateral stiffness and torsional stiffness are coupled and both contribute to out-of-plane deformation. The overall lateral stiffness will be dominated by the lower of the two. The lateral stiffness is the product of the Young's modulus and the [second moment of area](https://en.wikipedia.org/wiki/Second_moment_of_area) of the rim cross-section in the lateral direction. Wide rim sections have a higher lateral stiffness than narrow rim sections.

__Torsional stiffness__: The torsional stiffness is the resistance of the rim cross-section to twisting about its own centerline. As noted above, lateral deformations generally involve both lateral bending and twisting of the rim. The torsional stiffness is the product of the shear modulus and the [torsion constant](https://en.wikipedia.org/wiki/Torsion_constant) of the rim cross-section. The torsional stiffness is almost always smaller than the lateral bending stiffness, so it generally dominates the lateral stiffness of the wheel. Double-wall rims generally have much higher torsional stiffness than single-wall rims.

> The rims included in the app were measured using the [acoustic measurement technique developed by Ford, et. al.](https://rdcu.be/GPFI). The measured stiffnesses were rounded to convenient values.

#### Hub tab

__Rim-to-flange distance__: Specify the hub flange positions (lateral distance from the rim center-plane to each hub flange) for the drive side and non-drive side. If the Symmetric option is selected, drag either slider and the other will automatically mirror it. If the Symmetric option is not selected, you may independently set each flange position. Rear wheels and disc-brake wheels are commonly asymmetric due to the extra width needed for the sprocket or disc on one side of the hub. The flange position should be smaller on the side with the sprockets or disc.

> Note: The app assumes that all the spoke heads on a given flange have the same lateral position. This is not strictly true since inbound and outbound spokes will have slightly different lateral angles.

__Flange diameter__: Specify the hub flange diameter (the diameter of the circle of spoke holes). Increasing the flange diameter increases the wind-up stiffness of the wheel, but otherwise has little effect.

> Note: The hub is assumed to be rigid. For radial and lateral forces, this is a reasonable approximation as long as the flange diameter is small compared to the diameter of the wheel. However, a real hub has some torsional flexibility which can result in more torque being transmitted through the drive-side spokes than the non-drive-side spokes.

#### Spokes tab

__Number of spokes__: The total number of spokes in the wheel. This number must be even since there must be an equal number of spokes on the drive side and non-drive side.

__Spoke pattern__: Choose the spoke arrangement for the wheel. Increasing the number of crossings increases the torsional stiffness of the wheel dramatically, but slightly decreases the lateral and radial stiffness.

> Note: A radial-spoked wheel with no spoke tension has theoretically zero torsional stiffness, which leads to a "Linear algebra error." Add at least 1 kgf of tension in order to correct the error.

__Material__: The material sets the _density_ and _Young's modulus_ of the spoke material. Stainless steel (very common) has a Young's modulus of approximately 210 GPa. Aluminum and titanium are significantly less stiff (69 GPa and 105 GPa, respectively), but are also less dense.

__Diameter__: The effective average diameter of the spoke. For a straight-gauge spoke, this is simply the diameter. For a bladed spoke, the effective diameter is `d_eff = sqrt(1.273 * area)`, where area is the cross-sectional area. One could estimate the cross-sectional area by weighing a single spoke, knowing the density and length, or by measuring the short and long widths and [approximating the cross-section as an ellipse](https://en.wikipedia.org/wiki/Ellipse#Area). The effective diameter for butted spokes is more complicated, but is generally close to, but larger than the diameter of the thin section.

__Spoke tension__: Set the average tension in each spoke. On a symmetric wheel, the drive-side and non-drive-side tension will be equal. On an asymmetric wheel, the tension will be higher on the side with the smaller rim-to-flange distance (i.e. the drive-side on a typical rear wheel). The app will automatically calculate the correct tension for the opposite side, regardless of which slider you control.

### Applying forces

_Section under construction_
