import re
import json
from typing import List, Dict

def parse_response_with_coordinates(response: str) -> Dict:
    # Permitir variantes como CORDSLOC, CORDS_LOC, etc.
    split_pattern = re.compile(r"#?\s*CORDS[_]?LOC", re.IGNORECASE)
    parts = split_pattern.split(response)
    mensaje = parts[0].strip()

    if len(parts) < 2:
        return {
            "mensaje": mensaje,
            "localizaciones": []
        }

    coordenadas_texto = parts[1].strip()
    localizaciones: List[Dict] = []

    # Caso 1: ¿viene un bloque JSON embebido?
    json_match = re.search(r"\{[\s\S]+?\}", coordenadas_texto)
    if json_match:
        try:
            # Evaluar el string como JSON
            coords_dict = json.loads(json_match.group())
            for lugar, coord_str in coords_dict.items():
                lon, lat = [float(x.strip()) for x in coord_str.split(',')]
                localizaciones.append({
                    "lugar": lugar.strip(),
                    "latitud": lat,
                    "longitud": lon
                })
            return {
                "mensaje": mensaje,
                "localizaciones": localizaciones
            }
        except Exception:
            pass  # si no es un JSON válido, seguimos con texto plano

    # Caso 2: coordenadas línea por línea
    pattern = re.compile(r"[-•\s]*\*?\*?(?P<lugar>[^:\n]+):\s*(?P<latitud>-?\d+\.\d+)[°]?\s*[Nn]?,?\s*(?P<longitud>-?\d+\.\d+)[°]?\s*[Ww]?")
    for match in pattern.finditer(coordenadas_texto):
        try:
            localizaciones.append({
                "lugar": match.group("lugar").strip(" -*•"),
                "latitud": float(match.group("latitud")),
                "longitud": float(match.group("longitud"))
            })
        except Exception:
            continue

    return {
        "mensaje": mensaje,
        "localizaciones": localizaciones
    }