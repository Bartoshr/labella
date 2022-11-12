package sh.hsp.labella.controller

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import sh.hsp.labella.services.printing.PrintingService

@RestController
@RequestMapping(path = ["/api/templates/{templateId}/print"])
@CrossOrigin(origins = ["*"])
class PrintingController(
    val printingService: PrintingService
) {
    @PostMapping
    @ResponseStatus(code = HttpStatus.OK)
    fun printSvg(@PathVariable templateId: Long, @RequestBody printDTO: PrintDTO) {
        printingService.print(templateId, printDTO.fields)
    }
}

data class PrintDTO(val fields: Map<String, String>) {}