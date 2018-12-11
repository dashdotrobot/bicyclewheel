
// Add a forEach function
if (typeof Array.prototype.forEach != 'function') {
  Array.prototype.forEach = function(callback){
    for (var i = 0; i < this.length; i++){
      callback.apply(this, [this[i], i, this]);
    }
  };
}

/* -------------------------------- CONSTANTS -------------------------------- **
**
** --------------------------------------------------------------------------- */

var API_ENDPOINT = 'https://bike-wheel-api.herokuapp.com/calculate';

var RIM_MATLS = {
  'Alloy': {
    'density': 2700,
    'young_mod': 69e9,
    'shear_mod': 26e9
  },
  'Steel': {
    'density': 8000,
    'young_mod': 200e9,
    'shear_mod': 77e9
  }
};

var SPK_MATLS = {
  'Alloy': {
    'density': 2700,
    'young_mod': 69e9,
  },
  'Steel': {
    'density': 8000,
    'young_mod': 210e9,
  },
  'Titanium': {
    'density': 4500,
    'young_mod': 105e9
  }
};

var RIM_SIZES = [
  '700C/29er (622)',
  '27-inch frac. (630)',
  '650B (584)',
  '26-inch dec. (559)',
  '26-inch x 1 3/8 (590)',
  '24-inch dec. (507)',
  '20-inch dec. (406)',
  '36-inch (787)',
  '48-inch high-wheel (610)',
  '52-inch high-wheel (660)'
];

var RIM_PRESETS = {
  'Alex ALX-295': {
    'matl': 'Alloy',
    'size': '700C/29er (622)',
    'mass': 480,
    'EIrad': 310,
    'EIlat': 210,
    'GJ': 85
  },
  'Alex X404 27-inch': {
    'matl': 'Alloy',
    'size': '27-inch frac. (630)',
    'mass': 595,
    'EIrad': 130,
    'EIlat': 150,
    'GJ': 15
  },
  'Alex Y2000 26-inch': {
    'matl': 'Alloy',
    'size': '26-inch dec. (559)',
    'mass': 460,
    'EIrad': 110,
    'EIlat': 130,
    'GJ': 15
  },
  'Alex Y2000 700C': {
    'matl': 'Alloy',
    'size': '700C/29er (622)',
    'mass': 550,
    'EIrad': 125,
    'EIlat': 160,
    'GJ': 20
  },
  'DT Swiss R460': {
    'matl': 'Alloy',
    'size': '700C/29er (622)',
    'mass': 460,
    'EIrad': 280,
    'EIlat': 230,
    'GJ': 100
  },
  'DT Swiss TK540': {
    'matl': 'Alloy',
    'size': '700C/29er (622)',
    'mass': 550,
    'EIrad': 211,
    'EIlat': 260,
    'GJ': 75
  },
  'H Plus Son TB14': {
    'matl': 'Alloy',
    'size': '700C/29er (622)',
    'mass': 490,
    'EIrad': 89,
    'EIlat': 224,
    'GJ': 32
  },
  'Mavic A119 32-h': {
    'matl': 'Alloy',
    'size': '700C/29er (622)',
    'mass': 540,
    'EIrad': 140,
    'EIlat': 232,
    'GJ': 44
  },
  'Sun-Ringle CR18 700C, 36h': {
    'matl': 'Alloy',
    'size': '700C/29er (622)',
    'mass': 540,
    'EIrad': 110,
    'EIlat': 220,
    'GJ': 25
  },
  'Sun-Ringle CR18 20-inch': {
    'matl': 'Alloy',
    'size': '20-inch dec. (406)',
    'mass': 380,
    'EIrad': 100,
    'EIlat': 150,
    'GJ': 25
  },
};

var POLAR_LAYOUT = {
  margin: {
    l: 25, r: 25, t: 25, b: 25
  },
  legend: {
    orientation: 'h',
    xanchor: 'center',
    x: 0.5
  },
  polar: {
    angularaxis: {
      rotation: -90,
      showgrid: true,
      showticklabels: false,
      tickmode: 'linear',
      tick0: 0,
      ticks: ''
    },
    radialaxis: {
      angle: -90,
      showgrid: false,
      showticklabels: false
    }
  }
};

var FORCE_TYPES = ['Radial', 'Lateral', 'Tangential'];

var FORCE_PRESETS = {
  'Weight of bike + rider': [
    {'dof': 'Radial', 'loc': 0, 'mag': 50}
  ],
  'Pedaling torque': [
    {'dof': 'Tangential', 'loc': 0, 'mag': 15}
  ],
  'Rim braking': [
    {'dof': 'Tangential', 'loc': 0, 'mag': -15},
    {'dof': 'Tangential', 'loc': 180, 'mag': 15}
  ],
  'Side force': [
    {'dof': 'Lateral', 'loc': 0, 'mag': 15}
  ]
};

/* ---------------------------- SESSION VARIABLES ---------------------------- **
**
** --------------------------------------------------------------------------- */


var calc_result = false;
var wheel_obj;

/* ---------------------------- INITIALIZE GUI ---------------------------- **
**
** ------------------------------------------------------------------------ */

// Update value labels for all range sliders with class .update-range
$('input.update-range').on('change input', function() {
  $(this).prev().html('<strong>' + $(this).val() + '</strong>');
})

// Update value labels for hub width range sliders
$('#hubWidthLeft').on('change input', function() {
  $('#hubWidthLeft_label').html('<strong>' + (-parseInt($(this).val())).toString() + '</strong>');

  // If symmetric, update the other one to match
  if ($('#hubSymm').prop('checked')) {
    $('#hubWidthRight').val(-parseInt($(this).val()));
    $('#hubWidthRight_label').html('<strong>' + (-parseInt($(this).val())).toString() + '</strong>');
  }
})

$('#hubWidthRight').on('change input', function() {
  $('#hubWidthRight_label').html('<strong>' + $(this).val() + '</strong>');

  // If symmetric, update the other one to match
  if ($('#hubSymm').prop('checked')) {
    $('#hubWidthLeft').val(-parseInt($(this).val()));
    $('#hubWidthLeft_label').html('<strong>' + (parseInt($(this).val())).toString() + '</strong>');
  }
})

$('#hubSymm').change(function() {
  if ($(this).prop('checked')) {
    $('#hubWidthLeft').val(-parseInt($('#hubWidthRight').val()));
    $('#hubWidthLeft_label').html('<strong>' + (parseInt($('#hubWidthRight').val())).toString() + '</strong>');
  }
})


// Populate rim presets dropdown
for (var key in RIM_PRESETS) {
  $('#rimPreset').append('<option value="' + key + '">' + key + '</option>');
}

// Populate rim material dropdown
for (var key in RIM_MATLS) {
  $('#rimMatl').append('<option value="' + key + '">' + key + '</option>');
}

// Populate rim size dropdown
for (var i=0; i < RIM_SIZES.length; i++) {
  var size = RIM_SIZES[i]
  $('#rimSize').append('<option value="' + size + '">' + size + '</option>');
}


// Load a specified rim preset
function load_rim_preset(name) {

  if (name != 'Custom') {
    var rim = RIM_PRESETS[name];

    $('#rimMatl').val(rim['matl']);
    $('#rimSize').val(rim['size']);
    $('#rimMass').val(rim['mass']).trigger('change');
    $('#rimRadStiff').val(rim['EIrad']).trigger('change');
    $('#rimLatStiff').val(rim['EIlat']).trigger('change');
    $('#rimTorStiff').val(rim['GJ']).trigger('change');
  }
}

$('#rimPreset').change(function() {
  load_rim_preset($('#rimPreset').val());
})

// Set default rim preset
$('#rimPreset').val('Sun-Ringle CR18 700C, 36h').trigger('change');

// Set rim preset to "Custom" if any fields are changed
$('.rim-input').click(function() {
  $('#rimPreset').val('Custom');
})

// Populate spoke material dropdowns
for (var key in SPK_MATLS) {
  $('#spkMatl').append('<option value="' + key + '">' + key + '</option>');
  $('#spkMatlNDS').append('<option value="' + key + '">' + key + '</option>');
}

// Show or hide the non-drive-side spoke panel
$('#spkNDSSame').click(function() {
  if ($('#spkNDSSame').is(':checked')) {
    $('#spkNDSPanel').collapse('hide');

    // Reset NDS values to match
    $('.spokes-ds').each(function() {
      $('#' + $(this).prop('id') + 'NDS').val($(this).val()).trigger('change');
    })
  } else {
    $('#spkNDSPanel').collapse('show');
  }
})

// Set NDS properties equal if 'Same' is checked
$('.spokes-ds').on('change', function() {
  if ($('#spkNDSSame').is(':checked')) {
    $('#' + $(this).prop('id') + 'NDS').val($(this).val()).trigger('change');
  }
})

// Set default spoke material
$('#spkMatl').val('Steel').trigger('change');

// Set spoke tension based on tension ratio
$('#spkTens').on('change input', function() {
  var T_ratio = calc_tension_ratio()
  $('#spkTensNDS').val($(this).val() / T_ratio)
  $('#spkTensNDS').prev().html('<strong>' + $('#spkTensNDS').val() + '</strong>');
})
$('#spkTensNDS').on('change input', function() {
  var T_ratio = calc_tension_ratio()
  $('#spkTens').val($(this).val() * T_ratio)
  $('#spkTens').prev().html('<strong>' + $('#spkTensNDS').val() + '</strong>');
})


// Force presets
for (var key in FORCE_PRESETS) {
  $('#forcePresetDropdown').append('<a class="dropdown-item btn-sm force-preset" href="#">' + key + '</a>');
}

// Select a force preset
$('.force-preset').click(function() {
  forces = FORCE_PRESETS[$(this).text()];
  for (var i=0; i < forces.length; i++) {
    addForce(forces[i]['dof'],
             forces[i]['loc'],
             forces[i]['mag']);
  }
})

// Editable force table
function initEditableTable() {
  $('#tableForces').editableTableWidget();

  // Remove row callback
  $('.remove-row').click(function() {
    $(this).parent().parent().remove();
  })

  // Change force type callback
  $('.force-type').click(function() {
    i_new = (FORCE_TYPES.indexOf($(this).text().trim()) + 1) % 3;
    $(this).html(FORCE_TYPES[i_new] + ' <i class="fas fa-angle-double-down"></i>');
  })

}

function addForce(dof, loc, mag) {
  $('#tableForces tr:last').before('<tr><th class="force-type text-nowrap">' + dof +
                                   ' <i class="fas fa-angle-double-down"></i></th>' +
                                   '<td>' + loc.toString() + '</td>' +
                                   '<td>' + mag.toString() + '</td>' +
                                   '<th><a class="remove-row" href="#"><i class="fas fa-trash-alt"></i></a></th></tr>');

  // Re-initialize to add callbacks to new row
  initEditableTable();
}

// Add row callback
$('.add-force').click(function() {
  addForce('Radial', 0, 0)
})

initEditableTable();


// Work the magic!
$('#btnPressMe').on('click', function() {
  update_results();
})

function reset_calc_button() {
  $('#btnPressMe').text('Calculate');
  $('#btnPressMe').removeClass('disabled');
}

$('.result-navs').click(function() {
  window.setTimeout(function() {
    Plotly.Plots.resize(document.getElementById('deform-plot'));
    Plotly.Plots.resize(document.getElementById('tension-plot'));
  }, 0)
})

$('#scaleFactor').on('change input', function() {
  $(this).prev().html('<strong>' + $(this).val() + '%</strong>');
})

$('#scaleFactor').on('change', function() {
  plot_deformation();
})

$('.deform-button').click(function() {
  $(this).toggleClass('active');
  plot_deformation();
})

/* ------------------------------- FUNCTIONS ------------------------------ **
**
** ------------------------------------------------------------------------ */

function display_error(title, text) {
  var div_text = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'
  div_text += '<strong>' + title + ': </strong>' + text

  div_text += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'
  div_text += '<span aria-hidden="true">&times;</span></button></div>'

  $('#alerts').append(div_text)
}

// Calculate spoke tension ratio, T_ds / T_nds
function calc_tension_ratio() {

  w = build_json_wheel()

  // Drive-side spoke vector
  theta_h_ds = 4*Math.PI/w['spokes_ds']['num'] * w['spokes_ds']['num_cross'];
  n_ds_1 = w['hub']['width_ds']/1000;
  n_ds_2 = w['rim']['radius'] - w['hub']['diameter']/2*Math.cos(theta_h_ds);
  n_ds_3 = w['hub']['diameter']/2*Math.sin(theta_h_ds);
  l_ds = Math.hypot(n_ds_1, n_ds_2, n_ds_3);

  // Non-drive-side spoke vector
  theta_h_nds = 4*Math.PI/w['spokes_nds']['num'] * w['spokes_nds']['num_cross'];
  n_nds_1 = w['hub']['width_nds']/1000;
  n_nds_2 = w['rim']['radius'] - w['hub']['diameter']/2*Math.cos(theta_h_nds);
  n_nds_3 = w['hub']['diameter']/2*Math.sin(theta_h_nds);
  l_nds = Math.hypot(n_nds_1, n_nds_2, n_nds_3);

  c1_ds = n_ds_1 / l_ds
  c1_nds = n_nds_1 / l_nds

  return c1_nds / c1_ds
}

// Build JSON request object to send to wheel-api
function build_json_rim() {

  var rimForm = {}
  var rimJSON = {}

  // Load form data
  $('#formRim').serializeArray().forEach(function(e) { rimForm[e['name']] = e['value']; })

  // ISO diameter
  rimJSON['radius'] = 0.001*(parseFloat(/\((\d+)\)/g.exec(rimForm['rimSize'])[1])/2 - 5)

  // Material
  rimJSON['density'] = RIM_MATLS[rimForm['rimMatl']]['density']
  rimJSON['young_mod'] = RIM_MATLS[rimForm['rimMatl']]['young_mod']
  rimJSON['shear_mod'] = RIM_MATLS[rimForm['rimMatl']]['shear_mod']

  // Section properties
  rimJSON['section_type'] = 'general'
  rimJSON['section_params'] = {
    'area': 0.001*parseFloat(rimForm['rimMass']) / (rimJSON['density'] * 2*3.1415*rimJSON['radius']),
    'I_rad': parseFloat(rimForm['rimRadStiff']) / rimJSON['young_mod'],
    'I_lat': parseFloat(rimForm['rimLatStiff']) / rimJSON['young_mod'],
    'J_tor': parseFloat(rimForm['rimTorStiff']) / rimJSON['shear_mod'],
    'I_warp': 0.
  }

  return rimJSON
}

function build_json_hub() {

  var form = {}
  var json = {}

  // Load form data
  $('#formHub').serializeArray().forEach(function(e) { form[e['name']] = e['value']; })

  json['diameter'] = 0.001*parseFloat(form['hubDiameter'])
  json['width_ds'] = 0.001*parseFloat(form['hubWidthRight'])
  json['width_nds'] = -0.001*parseFloat(form['hubWidthLeft'])

  return json
}

function build_json_spokes(form_obj) {

  var form = {}
  var json = {}

  // Load form data
  form_obj.serializeArray().forEach(function(e) { form[e['name']] = e['value']; })

  // Pattern
  if (form['spkPattern'] == 'Radial') {
    json['num_cross'] = 0
  } else {
    json['num_cross'] = parseInt(form['spkPattern'].substring(0, 1))
  }

  // Material
  json['density'] = SPK_MATLS[form['spkMatl']]['density']
  json['young_mod'] = SPK_MATLS[form['spkMatl']]['young_mod']

  json['diameter'] = 0.001*parseFloat(form['spkDiam'])
  json['offset'] = 0.
  json['tension'] = parseFloat(form['spkTens']) * 9.81  // Newtons (from kgf)

  return json
}

function build_json_wheel() {

  var json = {}

  json['rim'] = build_json_rim()
  json['hub'] = build_json_hub()

  dsJSON = build_json_spokes($('#formSpokesDS'))
  ndsJSON = build_json_spokes($('#formSpokesNDS'))

  dsJSON['num'] = parseInt($('#spkNum').val())/2
  ndsJSON['num'] = parseInt($('#spkNum').val())/2

  json['spokes_ds'] = dsJSON
  json['spokes_nds'] = ndsJSON

  return json
}

function build_json_forces() {

  var dofs = {'Radial': 'f_rad', 'Lateral': 'f_lat', 'Tangential': 'f_tan'}
  var json = []

  $('#tableForces > tbody > tr').not(':first').not(':last').each(function() {
    dof = $(this).find('th:first').text().trim();
    loc = $(this).find('td:first').text();
    mag = $(this).find('td:last').text();

    f = {'location': parseFloat(loc)*Math.PI/180.};  // Convert [deg] -> [rad]
    f[dofs[dof]] = 9.81*parseFloat(mag);             // Convert [kgf] -> [N]

    json.push(f)
  })

  return json
}

function update_results() {

  // Disable "Calculate" button
  $('#btnPressMe').text('Please wait...')
  $('#btnPressMe').addClass('disabled')

  wheel_obj = build_json_wheel()

  post_data = {
    'wheel': wheel_obj,
    'tension': {'forces': build_json_forces()},
    'deformation': {
      'forces': build_json_forces(),
      'theta_range': [0., 2*Math.PI, 100]
    },
    'mass': {'empty': 0},
    'stiffness': {'empty': 0}
  }

  console.log(post_data)

  $.post({
    url: API_ENDPOINT,
    data: JSON.stringify(post_data),
    dataType: 'json',
    contentType: 'application/json',
    success: function (result) {
      calc_result = result;
      console.log(calc_result)
      plot_tensions();
      plot_deformation();
      show_summary();
      reset_calc_button();
    },
    error: function (xhr, ajaxOptions, thrownError) {
      // TODO
      reset_calc_button();
      display_error('AJAX error', '');
    }
  });
}

function plot_tensions() {

  if (!calc_result['tension']['success']) {
    display_error('Error calculating tensions', calc_result['tension']['error'])
    return false
  }

  theta = calc_result['tension']['spokes'].slice();
  tension = calc_result['tension']['tension'].slice();
  tension_0 = calc_result['tension']['tension_initial'].slice();

  if (tension.some(function(e) {return e < 0})) {
    display_error('Warning', 'At least one spoke has negative tension. Results may not be accurate.')
  }

  for (var i=0; i<theta.length; i++) {
  	theta[i] *= 360./parseFloat($('#spkNum').val());
    tension[i] /= 9.81;
    tension_0[i] /= 9.81;
  }

  if (true) {  // Separate traces for left and right spokes
    theta_nds = theta.filter(function(e, i) {return i%2 === 0})
    T_nds = tension.filter(function(e, i) {return i%2 === 0})
    T_0_nds = tension_0.filter(function(e, i) {return i%2 === 0})

    theta_ds = theta.filter(function(e, i) {return i%2 === 1})
    T_ds = tension.filter(function(e, i) {return i%2 === 1})
    T_0_ds = tension_0.filter(function(e, i) {return i%2 === 1})

    traces = [
      {
        name: 'Non-drive-side spokes',
        r: T_nds.concat(T_nds[0]),
        theta: theta_nds.concat(theta_nds[0]),
        type: 'scatterpolar',
        mode: 'lines+markers',
        line: {color: '#1f77b4'}
      },
      {
        r: T_0_nds.concat(T_0_nds[0]),
        theta: theta_nds.concat(theta_nds[0]),
        type: 'scatterpolar',
        mode: 'lines',
        showlegend: false,
        line: {color: '#1f77b4', shape: 'spline'},
        opacity: 0.5
      },
      {
        name: 'Drive-side spokes',
        r: T_ds.concat(T_ds[0]),
        theta: theta_ds.concat(theta_ds[0]),
        type: 'scatterpolar',
        mode: 'lines+markers',
        line: {color: '#ff7f0e'}
      },
      {
        r: T_0_ds.concat(T_0_ds[0]),
        theta: theta_ds.concat(theta_ds[0]),
        type: 'scatterpolar',
        mode: 'lines',
        showlegend: false,
        line: {color: '#ff7f0e', shape: 'spline'},
        opacity: 0.5
      }
    ]
  }

  var layout = $.extend({}, POLAR_LAYOUT);
  layout['polar']['angularaxis']['dtick'] = 360. / parseInt($('#spkNum').val());

  plot_canvas = document.getElementById('tension-plot');

  Plotly.newPlot(plot_canvas, traces, layout, {
    responsive: true,
    modeBarButtonsToRemove: ['sendDataToCloud', 'lasso2d', 'select2d'],
    displaylogo: false
  });
}

function array_mult_scalar(x, a) {
  // Multiple each element in an array 'x' a scalar 'a'
  for (var i=0; i < x.length; i++) {
    x[i] *= a
  }
  return x
}

function array_add_scalar(x, a) {
  // Add a scalar 'a' to each element in an array 'x'
  for (var i=0; i < x.length; i++) {
    x[i] += a
  }
  return x
}

function plot_deformation() {

  if (!calc_result['deformation']['success']) {
    display_error('Error calculating tensions', calc_result['deformation']['error'])
    return false
  }

  rim_radius = wheel_obj['rim']['radius'];

  theta = array_mult_scalar(calc_result['deformation']['theta'].slice(), 180./Math.PI);
  def_rad = array_mult_scalar(calc_result['deformation']['def_rad'].slice(), -1);
  def_lat = calc_result['deformation']['def_lat'].slice();
  def_tor = array_mult_scalar(calc_result['deformation']['def_tor'].slice(), rim_radius);

  var traces_deform = {
    'Radial': {
      name: 'Radial',
      def: def_rad,
      def_max: Math.max.apply(null, def_rad.map(Math.abs)),
      line: {color: '#1f77b4', shape: 'spline'},
    },
    'Lateral': {
      name: 'Lateral',
      def: def_lat,
      def_max: Math.max.apply(null, def_lat.map(Math.abs)),
      line: {color: '#ff7f0e', shape: 'spline'},
    },
    'Twist': {
      name: 'Twist (R*phi)',
      def: def_tor,
      def_max: Math.max.apply(null, def_tor.map(Math.abs)),
      line: {color: '#2ca02c', shape: 'spline'},
    }
  }

  // Add selected traces to a new list
  var trace_select = [];
  var def_max = [];
  $('.deform-button').each(function() {
    if ($(this).hasClass('active')) {
      trace_select.push(traces_deform[$(this).text().trim()]);
      def_max.push(traces_deform[$(this).text().trim()]['def_max']);
    }
  })

  // Calculate scaling factor
  scale_factor = parseFloat($('#scaleFactor').val()) / 100. / Math.max(...def_max)

  // Apply scaling factor to each trace
  for (var t=0; t < trace_select.length; t++) {
    tr = trace_select[t];
    tr['r'] = array_add_scalar(array_mult_scalar(tr['def'], scale_factor), 1.);
    tr['theta'] = theta.slice();

    // Connect trace to its endpoint
    tr['theta'].push(tr['theta'][0]);
    tr['r'].push(tr['r'][0]);

    // Line options
    tr['type'] = 'scatterpolar';
    tr['mode'] = 'lines';
    tr['showlegend'] = true;
  }

  // Add a gray reference circle
  trace_unitcircle = [
    {
      r: new Array(theta.length + 1).fill(1.),
      theta: theta.concat(theta[0]),
      type: 'scatterpolar',
      mode: 'lines',
      showlegend: false,
      line: {color: '#333333', shape: 'spline'},
    }
  ]

  var layout = $.extend({}, POLAR_LAYOUT);
  layout['polar']['angularaxis']['dtick'] = 360. / parseInt($('#spkNum').val());

  plot_canvas = document.getElementById('deform-plot');
  Plotly.newPlot(plot_canvas, trace_unitcircle.concat(trace_select), layout, {
    responsive: true,
    modeBarButtonsToRemove: ['sendDataToCloud', 'lasso2d', 'select2d'],
    displaylogo: false
  });
}

function show_summary() {

  // Mass properties
  mass = calc_result['mass']
 
  if (mass['success']) {

    $('#sumMassGrams').html((1000*mass['mass']).toFixed(0) + ' grams')
    $('#sumMassLbs').html('(' + (2.20462*mass['mass']).toFixed(2) + ' lbs)')

    $('#sumMassRotGrams').html(Math.round(1000*mass['mass_rotational']).toString() + ' grams')
    $('#sumMassRotLbs').html('(' + (2.20462*mass['mass_rotational']).toFixed(2) + ' lbs)')

  } else {
    display_error('Error calculating mass', calc_result['mass']['error'])
  }

  // Stiffness properties
  stiff = calc_result['stiffness']

  if (stiff['success']) {

    $('#sumStiffRadSI').html((0.001*stiff['radial_stiffness']).toFixed(0) + ' N/mm')
    $('#sumStiffRadLbs').html('(' + (0.224809*0.0254*stiff['radial_stiffness']).toFixed(0) + ' lbs/in)')

    $('#sumStiffLatSI').html((0.001*stiff['lateral_stiffness']).toFixed(1) + ' N/mm')
    $('#sumStiffLatLbs').html('(' + (0.224809*0.0254*stiff['lateral_stiffness']).toFixed(0) + ' lbs/in)')

    $('#sumStiffTorSI').html((Math.PI/180.*stiff['torsional_stiffness']).toFixed(0) + ' N/deg')
    $('#sumStiffTorLbs').html('(' + (Math.PI/180.*0.224809*stiff['torsional_stiffness']).toFixed(0) + ' lbs/deg)')

  } else {
    display_error('Error calculating stiffness', stiff['error'])
  }
}

update_results()
