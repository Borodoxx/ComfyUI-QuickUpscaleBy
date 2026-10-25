import { app } from "../../scripts/app.js";

app.registerExtension({
    name: "QuickUpscaleImageBy.Buttons",
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if (nodeData.name === "QuickUpscaleImageBy") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            nodeType.prototype.onNodeCreated = function () {
                const r = onNodeCreated ? onNodeCreated.apply(this, arguments) : undefined;

                const scaleWidget = this.widgets.find(w => w.name === "scale_by");
                if (!scaleWidget) return r;

                const presets = [
                    { label: "x0.25", value: 0.25 },
                    { label: "x0.5", value: 0.50 },
                    { label: "x0.75", value: 0.75 },
                    { label: "x1", value: 1.00 },
                    { label: "x1.25", value: 1.25 },
                    { label: "x1.5", value: 1.50 },
                    { label: "x2", value: 2.00 },
                    { label: "x4", value: 4.00 },
                ];

                const rowWidget = {
                    name: "preset_buttons_row",
                    type: "custom_row",
                    value: null,
                    options: { serialize: false },
                    draw: function (ctx, node, widgetWidth, y, widgetHeight) {
                        const margin = 12;
                        const gap = 3;
                        const totalWidth = widgetWidth - margin * 2;
                        const btnWidth = (totalWidth - gap * (presets.length - 1)) / presets.length;
                        const btnHeight = 22;

                        ctx.save();
                        ctx.font = "600 10px sans-serif";
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";

                        presets.forEach((p, i) => {
                            const bx = margin + i * (btnWidth + gap);
                            const isActive = Math.abs(scaleWidget.value - p.value) < 0.005;

                            ctx.fillStyle = isActive ? "#3b6588" : "#2a2a2a";
                            ctx.strokeStyle = isActive ? "#5b9bd5" : "#444444";
                            ctx.lineWidth = 1;

                            ctx.beginPath();
                            if (ctx.roundRect) {
                                ctx.roundRect(bx, y, btnWidth, btnHeight, 4);
                            } else {
                                ctx.rect(bx, y, btnWidth, btnHeight);
                            }
                            ctx.fill();
                            ctx.stroke();

                            ctx.fillStyle = isActive ? "#ffffff" : "#dddddd";
                            ctx.fillText(p.label, bx + btnWidth / 2, y + btnHeight / 2 + 1);
                        });

                        ctx.restore();
                    },
                    mouse: function (event, pos, node) {
                        if (event.type === "pointerdown" || event.type === "mousedown") {
                            const margin = 12;
                            const gap = 3;
                            const totalWidth = node.size[0] - margin * 2;
                            const btnWidth = (totalWidth - gap * (presets.length - 1)) / presets.length;

                            const relX = pos[0] - margin;
                            if (relX >= 0 && relX <= totalWidth) {
                                const index = Math.floor(relX / (btnWidth + gap));
                                const offsetInSlot = relX - index * (btnWidth + gap);
                                if (offsetInSlot <= btnWidth && index >= 0 && index < presets.length) {
                                    const chosen = presets[index].value;
                                    scaleWidget.value = chosen;
                                    if (scaleWidget.callback) {
                                        scaleWidget.callback(chosen);
                                    }
                                    app.graph.setDirtyCanvas(true, true);
                                    return true;
                                }
                            }
                        }
                        return false;
                    },
                    computeSize: function (width) {
                        return [Math.max(width, 280), 26];
                    }
                };

                rowWidget.serialize = false;
                this.addCustomWidget(rowWidget);
                
                const sz = this.computeSize();
                this.setSize([Math.max(sz[0], 280), sz[1]]);

                return r;
            };
        }
    }
});