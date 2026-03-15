Custom Selection Effect (React)

A small React experiment that replaces the native browser text highlight with a custom visual effect layer.
Instead of using the default ::selection color, this component renders a masked gradient effect that appears only where text is selected.

The highlight area is computed from the browser Selection API and converted into an SVG mask, allowing advanced visuals such as gradients, shaders, or particles to appear inside the selection.