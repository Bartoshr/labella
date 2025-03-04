package sh.hsp.labella.application.services.previewing

import sh.hsp.labella.application.services.templating.TemplatingService
import sh.hsp.labella.model.RenderedImage
import sh.hsp.labella.model.ports.LabelRescaler
import sh.hsp.labella.model.ports.LabelSizeProvider
import sh.hsp.labella.model.ports.MultipleSVGRenderingService
import sh.hsp.labella.model.ports.SvgSizeExtractor

class LanguagePreviewingService(
    val templateService: TemplatingService,
    val svgSizeExtractor: SvgSizeExtractor,
    val SVGRendererService: MultipleSVGRenderingService,
    val labelRescaler: LabelRescaler
) : PreviewingService {

    override fun preview(templateId: Long, fields: Map<String, String>): List<RenderedImage> {
        val render =
            templateService.template(templateId, fields).templated
                .renderToImage(
                    svgSizeExtractor,
                    labelRescaler,
                    SVGRendererService
                )

        return render
    }
}