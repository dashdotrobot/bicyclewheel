Title: Instructions
Authors: Matthew Ford
Slug: howto

# How to use the Bicycle Wheel App

The Bicycle Wheel App is a tool for designing a virtual wheel and simulating its response to external forces.

## Usage

### Designing your wheel

Design your wheel using the options in the left panel.

#### Rim tab

You may choose from a short list of rims which have already been characterized, or design your own from scratch. The app does not perform any checks to ensure that your rim is feasible. For guidance on the values below, try choosing some presets to see what values they have.

__Material__: The material sets the _density_, the [_Young's modulus_](https://en.wikipedia.org/wiki/Young%27s_modulus), and [_shear modulus_](https://en.wikipedia.org/wiki/Shear_modulus). The density, together with the wheel size and mass, determines the cross-sectional area of the rim. The cross-sectional area generally has a very small effect on the mechanical behavior. The Young's modulus and shear modulus are already incorporated into the bending stiffnesses, and therefore have no direct effect on the mechanical behavior of the wheeel.

__Wheel Size__: Select from a list of standard wheel sizes. This determines the _radius_ of the rim. Small wheels are inherently stiffer and stronger than large wheels.

__Mass__: The mass of the rim has a negligible effect on the mechanical properties (unless it is very small), but has a large effect on the inertial properties of the wheel.

__Radial stiffness__: The radial bending stiffness is the resistance of the rim cross-section to bending within its initial plane (think of a rim being squashed top-to-bottom). It is the product of the Young's Modulus and the [second moment of area](https://en.wikipedia.org/wiki/Second_moment_of_area) of the rim cross-section in the radial direction. Deep rim sections have a higher radial stiffness than shallow rim sections.

__Lateral stiffness__: The lateral bending stiffness is the resistance of the rim cross-section to bending out of its initial plane (think of a rim being bent sideways). The lateral stiffness and torsional stiffness are coupled and both contribute to out-of-plane deformation. The overall lateral stiffness will be dominated by the lower of the two. The lateral stiffness is the product of the Young's Modulus and the [second moment of area](https://en.wikipedia.org/wiki/Second_moment_of_area) of the rim cross-section in the lateral direction. Wide rim sections have a higher radial stiffness than narrow rim sections.

__Torsional stiffness__: The torsional stiffness is the resistance of the rim cross-section to twisting about its own centerline. As noted above, lateral deformations generally involve both lateral bending and twisting of the rim. The torsional stiffness is the product of the shear Modulus and the [torsion constant](https://en.wikipedia.org/wiki/Torsion_constant) of the rim cross-section.

#### Hub tab

__Rim-to-flange distance__: Specify the hub flange positions (lateral distance from the rim center-plane to each hub flange). The positive number is the distance to the _right_ or _drive-side_ flange, while the negative number is the distance to the _left_ or _non-drive-side_ flange. If the Symmetric option is selected, drag the right slider and the left slider will automatically mirror it. If the Asymmetric option is selected, you may independently set each flange position. Rear wheels and disc-brake wheels are commonly asymmetric due to the extra width needed for the sprocket or disc on one side of the hub. The flange position should be smaller on the side with the sprockets or disc.

> Note: The app assumes that all the spoke heads on a given flange have the same lateral position. This is not strictly true since inbound and outbound spokes will have slightly different lateral angles.


__Flange diameter__: Specify the hub flange diameter (the diameter of the circle of spoke holes).

#### Spokes tab

__Material__: The material sets the _density_ and _Young's modulus_ of the spoke material. Stainless steel (very common) has a Young's Modulus of approximately 210 GPa.

__Number of spokes__: The total number of spokes for one wheel.

__Diameter__: The effective average diameter of the spoke. For a straight-gauge spoke, this is simply the diameter. for a bladed spoke, the effective diameter is `d_eff = sqrt(1.27 * area)`, where area is the cross-sectional area. The effective diameter for butted spokes is more complicated, but is generally close to the diameter of the swaged (thin) section.

__Spoke tension__: Set the drive-side spoke tension by dragging the "Drive-side tension" slider. The "Non-drive-side tension" slider will automatically update to the correct value based on the hub flange distances you have chosen. On a symmetric wheel, the drive-side and non-drive-side tension will be equal. On an asymmetric wheel, the tension will be higher on the side with the smaller rim-to-flange distance (i.e. the drive-side on a typical rear wheel).

__Spoke pattern__: Choose the spoke arrangement for the wheel. Increasing the number of crossings increases the torsional stiffness of the wheel dramatically, but slightly decreases the lateral and radial stiffness.

> Note: A radial-spoked wheel with no spoke tension has theoretically zero torsional stiffness, which leads to a "Singular Matrix" error.

### Applying forces

_Section under construction_
