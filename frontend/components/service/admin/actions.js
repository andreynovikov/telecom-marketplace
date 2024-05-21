'use client'

import { useState, useEffect } from 'react'
import { useFormState } from 'react-dom'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

import { createService, updateService, deleteService } from '../queries'

export function ServiceAction(props) {
    const { service, categoryId } = props
    const createServiceWithCategory = createService.bind(null, categoryId)
    const updateServiceWithCategory = updateService.bind(null, service?.id, categoryId)
    const deleteServiceWithCategory = deleteService.bind(null, service?.id, categoryId)

    const [show, setShow] = useState(false)
    const [result, dispatch] = useFormState(service?.id ? updateServiceWithCategory : createServiceWithCategory, service || {})

    useEffect(() => {
        if (result.id)
            setShow(false)
    }, [result])

    const handleClose = () => {
        setShow(false)
    }

    return (
        <>
            <Button onClick={() => setShow(true)}>
                {service?.id ? 'Редактировать услугу' : 'Добавить услугу'}
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{service?.id ? 'Редактировать услугу' : 'Добавить услугу'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form action={dispatch} id="myForm">
                        <Form.Group className="mb-3">
                            <Form.Label>Название</Form.Label>
                            <Form.Control
                                name="name"
                                type="text"
                                defaultValue={service?.name}
                                autoFocus
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                name="description"
                                defaultValue={service?.description}
                                as="textarea"
                                rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {service?.id && (
                        <Button variant="danger" type="submit" form="myForm" formAction={deleteServiceWithCategory}>
                            Удалить
                        </Button>
                    )}
                    <Button variant="primary" type="submit" form="myForm">
                        {service?.id ? 'Сохранить' : 'Добавить'}
                    </Button>
                    <Button onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
