'use client'

import { saveContractor } from '@/components/contractor/queries'
import FileUpload from '@/components/ui/file-upload'
import { useAuth } from '@/lib/auth'

export default function SignUp() {
    const { session } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const result = await saveContractor(formData)
        console.log(result)
    }

    return (
        <form onSubmit={handleSubmit} className="setting_form">
            <input type="hidden" name="kind" value="1" />
            <div className="row">
                <div className="col-lg-6">
                    <div className="information_module">
                        <div className="information__set">
                            <div className="information_wrapper form--fields">
                                <h3>Данные о поставщике услуг</h3>
                                <p>
                                    Вы можете заполнить некоторые поля позже.
                                </p>
                                <div className="form-group">
                                    <label htmlFor="name">Название компании</label>
                                    <input id="name" name="name" type="text" className="text_field" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="inn">ИНН</label>
                                    <input id="inn" name="inn" type="text" className="text_field" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="legal_address">Юридический адрес</label>
                                    <input id="legal_address" name="legal_address" type="text" className="text_field" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cover_letter">Информация о компании</label>
                                    <textarea id="cover_letter" name="cover_letter" className="text_field" placeholder="Краткая информация о вашей компании..."></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="experience">Опыт работы</label>
                                    <textarea id="experience" name="experience" className="text_field" placeholder="Краткое описание опыта работы..."></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="information_module">
                        <div className="information__set">
                            <div className="information_wrapper">
                                <FileUpload name="cover_file" description="Файл с информацией о компании" variants="Документ или архив" />
                            </div>
                        </div>
                    </div>

                    <div className="information_module">
                        <div className="information__set">
                            <div className="information_wrapper">
                                <FileUpload name="experience_file" description="Файл с опытом работы" variants="Документ или архив" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="dashboard_setting_btn">
                        <button type="submit" className="btn btn--round btn--md">Сохранить</button>
                    </div>
                </div>

            </div>
        </form>
    )
}
