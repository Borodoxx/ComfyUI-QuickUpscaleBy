\# ComfyUI-QuickUpscaleBy



A custom extension for \[ComfyUI](https://github.com/comfyanonymous/ComfyUI) providing an image upscaling node with convenient, one-click preset scale buttons.



Instead of manually typing scale factors or dragging small sliders, quickly select from common scaling ratios directly within the node interface.



!\[Node Preview](screenshot.png) <!-- Optional: Add a screenshot of the node here -->



\## Features



\- \*\*Quick Scale Presets:\*\* Instant scaling buttons for `x0.25`, `x0.5`, `x0.75`, `x1`, `x1.25`, `x1.5`, `x2`, and `x4`.

\- \*\*Responsive Layout:\*\* Preset buttons dynamically adapt to node resizing and match the standard ComfyUI widget styling.

\- \*\*Active State Highlighting:\*\* Visually highlights the button currently matching the selected scale value.

\- \*\*Full Customizability:\*\* Retains manual entry in the `scale\_by` field for arbitrary scale factors.

\- \*\*Standard Interpolation Methods:\*\* Supports all built-in upscale algorithms (`nearest-exact`, `bilinear`, `area`, `bicubic`, `lanczos`).



\---



\## Installation



\### Method 1: ComfyUI Manager (Recommended)



1\. Open \*\*ComfyUI Manager\*\* inside ComfyUI.

2\. Click \*\*Install via Git URL\*\*.

3\. Enter the repository URL:

&#x20;  ```text

&#x20;  \[https://github.com/](https://github.com/)<your\_username>/ComfyUI-QuickUpscaleBy.git

