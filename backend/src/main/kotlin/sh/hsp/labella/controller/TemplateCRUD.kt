package sh.hsp.labella.controller

import org.springframework.data.repository.CrudRepository
import org.springframework.web.bind.annotation.CrossOrigin
import sh.hsp.labella.model.Template

@CrossOrigin(origins = ["*"])
interface TemplateRepository : CrudRepository<Template, Long> {
}