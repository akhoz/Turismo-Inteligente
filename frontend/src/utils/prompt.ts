export const vacationsPrompt = `
Actúa como un experto en turismo. Quiero que me hagas un plan de vacaciones en la Fortuna San Carlos. A ese destino vamos a ir por una semana mi esposa (30 años), mi hija (5 años) y yo (30 años). 

La respuesta que me das debe estar en formato de Markdown separando el contenido con espacios con el fin de organización, usa títulos en markdown con # y negritas para mantener la respuesta organizada y con sus diferencias de formato, además el contenido no puede estar contenido en un bloque de código, ósea no quiero que uses 
, simplemente dame el markdown con el contenido, además no quiero que me adjuntes el .json solo dame la respuesta.

Además, dame todas las direcciones AL FINAL DE LA RESPUESTA COMPLETA, por ejemplo. En formato Json

Lugar: longitud, latitud

Para esa última sección escribe un titulo que se llame CORDSLOC
`.trim()

export const entrepreneurshipPrompt = `
Actuá como experto en emprendimientos. Me encuentro en San Vicente, San Carlos, Costa Rica. Quiero que me recomiendes actividades que puedo hacer en este lugar para fomentar el turismo de la zona y que funcionen como mi propio emprendimiento. Ten en cuenta que hay cataratas, zonas verdes, mucha fauna y flora, miradores, entre otros.
`.trim()