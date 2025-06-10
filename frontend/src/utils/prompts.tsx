export const vacationPromptPrefix = "Actúa como un experto en turismo."

export const vacationPromptSuffix = `
La respuesta que me das debe estar en formato de Markdown separando el contenido con espacios con el fin de organización, usa títulos en markdown con # y negritas para mantener la respuesta organizada y con sus diferencias de formato, además el contenido no puede estar contenido en un bloque de código, ósea no quiero que uses triple backticks, simplemente dame el markdown con el contenido, además no quiero que me adjuntes el .json solo dame la respuesta.

Además, dame todas las direcciones AL FINAL DE LA RESPUESTA COMPLETA, por ejemplo. En formato Json

Lugar: longitud, latitud. Para esa última sección escribe un título que se llame CORDSLOC
`

export const businessPromptPrefix = "Actuá como experto en emprendimientos."

export const businessPromptSuffix = `
La respuesta que me das debe estar en formato de Markdown separando el contenido con espacios con el fin de organización, usa títulos en markdown con # y negritas para mantener la respuesta organizada y con sus diferencias de formato, además el contenido no puede estar contenido en un bloque de código, ósea no quiero que uses triple backticks, simplemente dame el markdown con el contenido, además no quiero que me adjuntes el .json solo dame la respuesta.
`