import comfy.utils

class QuickUpscaleImageBy:
    upscale_methods = ["nearest-exact", "bilinear", "area", "bicubic", "lanczos"]

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "image": ("IMAGE",),
                "upscale_method": (s.upscale_methods,),
                "scale_by": ("FLOAT", {"default": 1.0, "min": 0.01, "max": 8.0, "step": 0.01}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "upscale"
    CATEGORY = "image/upscaling"

    def upscale(self, image, upscale_method, scale_by):
        samples = image.movedim(-1, 1)
        width = max(1, round(samples.shape[3] * scale_by))
        height = max(1, round(samples.shape[2] * scale_by))
        s = comfy.utils.common_upscale(samples, width, height, upscale_method, "disabled")
        s = s.movedim(1, -1)
        return (s,)

# Указываем ComfyUI подгрузить JS-интерфейс с кнопками из папки js
WEB_DIRECTORY = "./js"

NODE_CLASS_MAPPINGS = {
    "QuickUpscaleImageBy": QuickUpscaleImageBy
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "QuickUpscaleImageBy": "Upscale Image By (Quick Buttons)"
}

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]