
c3dl.cartoon_fs="uniform sampler2D myTex;"+"uniform sampler2D celShadeTex;"+"uniform int usingTexture;"+"varying vec4 texCoord;"+"varying vec3 norm;"+"varying vec3 pos;"+"void c3dl_celPointLight(in Light light, in vec3 fragPos, in vec3 normal, inout float intensity)"+"{"+"  vec3 rayDir = vec3(light.position) - fragPos;"+"  intensity += max(dot(normalize(rayDir),normal),0.0);"+"}"+"void c3dl_celDirLight(in Light light, in vec3 normal, inout float intensity)"+"{"+"  intensity += max(dot(normalize(vec3(-light.position)),normal), 0.0);"+"}"+"void c3dl_celSpotLight(in Light light, in vec3 fragPos, in vec3 normal, inout float intensity)"+"{"+"  vec3 rayDir = fragPos - vec3(light.position);"+"  rayDir = normalize(rayDir);"+"  float spotDot = dot(rayDir, normalize(light.spotDirection));"+"  if( dot(-normal, rayDir ) > 0.0 && spotDot > cos(radians(light.spotCutoff)) )"+"  {"+"    intensity += max(dot(-normal, rayDir), 0.0);"+"  }"+"}"+"void main(void)"+"{"+"  if(lightingOn == false)"+"  {"+"    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);"+"  }"+"  else"+"  {"+"    vec3 n = normalize(norm);"+"    vec4 color = vec4(1.0, 1.0, 1.0, 1.0);"+"    if( usingTexture == 1 )"+"    {"+"      vec3 texel = vec3(texture2D(myTex, texCoord.xy));"+"      color = vec4(texel, 1.0);"+"    }"+"    float intensity = 0.0;"+"    for(int i = 0; i < C3DL_MAX_LIGHTS; i++)"+"    {"+"      if(lights[i].isOn == true) "+"      {"+"        if(lights[i].type == 1)"+"        {"+"          c3dl_celDirLight(lights[i], n, intensity);"+"        }"+"       else if(lights[i].type == 2)"+"       {"+"         c3dl_celPointLight(lights[i], pos, n, intensity);"+"       }"+"       else"+"       {"+"         c3dl_celSpotLight(lights[i], pos, n, intensity);"+"       }"+"     }"+"   }"+"    intensity = clamp(intensity, 0.1, 0.9);"+"    vec3 celTexel = vec3(texture2D(celShadeTex, vec2(intensity, 0.0)));"+"    gl_FragColor = color * vec4(celTexel, 1.0);"+"  }"+"}";