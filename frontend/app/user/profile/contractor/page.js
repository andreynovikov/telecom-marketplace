'use client'

import { useState, useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

import { getContractors, saveContractor } from '@/components/contractor/queries'

import SubjectSelector from '@/components/subject/select'
import FileUpload from '@/components/ui/file-upload'

export default function ContractorForm() {
    const [data, setData] = useState({})

    const [result, dispatch] = useFormState(saveContractor, undefined)

    useEffect(() => {
        getContractors().then((result) => setData(result))
    }, [result])

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="dashboard_title_area">
                        <div className="dashboard__title">
                            <h3>Данные о поставщике услуг</h3>
                        </div>
                    </div>
                </div>
            </div>
            <form action={dispatch} className="setting_form">
                <input type="hidden" name="kind" value="1" />
                <div className="row">
                    <div className="col-lg-6">
                        <div className="information_module">
                            <div className="information__set">
                                <div className="information_wrapper form--fields">
                                    <p>
                                        Вы можете заполнить некоторые поля позже.
                                    </p>
                                    <div className="form-group">
                                        <label htmlFor="name">Название компании</label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            defaultValue={data.name}
                                            className="text_field" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="inn">ИНН</label>
                                        <input
                                            id="inn"
                                            name="inn"
                                            type="text"
                                            defaultValue={data.inn}
                                            className="text_field" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="legal_address">Юридический адрес</label>
                                        <input
                                            id="legal_address"
                                            name="legal_address"
                                            type="text"
                                            defaultValue={data.legal_address}
                                            className="text_field" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cover_letter">Информация о компании</label>
                                        <textarea
                                            id="cover_letter"
                                            name="cover_letter"
                                            defaultValue={data.cover_letter}
                                            className="text_field"
                                            placeholder="Краткая информация о вашей компании..." />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="experience">Опыт работы</label>
                                        <textarea
                                            id="experience"
                                            name="experience"
                                            defaultValue={data.experience}
                                            className="text_field"
                                            placeholder="Краткое описание опыта работы..." />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="information_module">
                            <div className="information__set">
                                <div className="information_wrapper">
                                    <FileUpload
                                        name="cover_file"
                                        defaultValue={data.cover_file}
                                        description="Файл с информацией о компании"
                                        variants="Документ или архив" />
                                </div>
                            </div>
                        </div>

                        <div className="information_module">
                            <div className="information__set">
                                <div className="information_wrapper">
                                    <FileUpload
                                        name="experience_file"
                                        defaultValue={data.experience_file}
                                        description="Файл с опытом работы"
                                        variants="Документ или архив" />
                                </div>
                            </div>
                        </div>

                        <div className="information_module">
                            <div className="information__set mail_setting">
                                <div className="information_wrapper">
                                    <h4>География услуг</h4>
                                    <SubjectSelector geography={data?.geography} />
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
        </>
    )
}
