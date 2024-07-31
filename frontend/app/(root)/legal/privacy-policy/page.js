import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import PageWrapper from '@/components/ui/page-wrapper'

const Header = ({ children }) => <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>{children}</Typography>
const Paragraph = ({ children }) => <Typography sx={{ mb: 1 }}>{children}</Typography>

export default async function PrivacyPolicy() {
    return (
        <PageWrapper title="Политика конфиденциальности">
            <Card sx={{ p: 3 }}>
                <Paragraph>
                    Политика конфиденциальности Общества с ограниченной ответственностью «-----» (сокращенное наименование - ООО «-----» (ИНН -----, ОГРН -----) (далее - Администрация), разработана в соответствии с положениями законодательства Российской Федерации и Правилами использования Сервиса Приложения, размещенными на сайте ПРИЛОЖЕНИЕ.ru по адресу: ___________.
                </Paragraph>
                <Paragraph>
                    Политика конфиденциальности ООО «-----» (далее – Политика) является приложением к Правилам использования Сервиса Приложения и их неотъемлемой частью. Принимая условия Правил использования Сервиса Приложения, Пользователь автоматически принимает условия настоящей Политики.
                </Paragraph>
                <Header>
                    Термины и определения.
                </Header>
                <Paragraph>
                    <b>Стороны</b> – Администрация и любой зарегистрированный в Приложении Пользователь.
                </Paragraph>
                <Paragraph>
                    <b>Передающая сторона</b> (раскрывающая) – Сторона, предоставляющая другой Стороне доступ к Конфиденциальной информации, обладателем которой она является, в том числе путем передачи Конфиденциальной информации как на материальном носителе, так и на любых электронных носителях или передаваемая посредством сети Интернет, и/или предъявляющая требование к другой Стороне о соблюдении конфиденциальности информации, содержащейся в материалах, разрабатываемых другой Стороной или передаваемых другой Стороне в ходе исполнения договора, заключенного Сторонами или в ходе ведения переговоров о заключении договора.
                </Paragraph>
                <Paragraph>
                    <b>Принимающая сторона</b> (получающая) – Сторона, получающая от другой Стороны доступ к Конфиденциальной информации, обладателем которой является Передающая сторона.
                </Paragraph>
                <Paragraph>
                    <b>Конфиденциальная информация</b> – информация, признаваемая конфиденциальной в соответствии с законодательством Российской Федерации, локальными нормативными актами Передающей стороны, с которыми ознакомлена Принимающая сторона, иная информация, в отношении которой Передающей стороной заявлено требование о соблюдении ее конфиденциальности, в том числе информация, указанная в качестве конфиденциальной в договорах между Сторонами, включая информацию, составляющую коммерческую тайну и информацию, относящуюся к персональным данным.
                </Paragraph>
                <Paragraph>
                    <b>Конфиденциальность информации</b> –  обязательное для выполнения лицом, получившим доступ к определенной информации, требование не передавать такую информацию третьим лицам без предварительного письменного согласия ее обладателя.
                </Paragraph>
                <Paragraph>
                    <b>Носители информации</b> – материальные объекты, в которых информация, составляющая Конфиденциальную информацию, находит свое отображение в виде символов, технических решений и процессов.
                </Paragraph>
                <Paragraph>
                    <b>Передача Конфиденциальной информации</b> – передача информации, зафиксированной в качестве конфиденциальной, как на материальном носителе, так и на любых электронных носителях, или передаваемая посредством сети Интернет, Передающей стороной Принимающей стороне или Принимающей стороной третьим лицам с согласия Передающей стороны, а также с согласия иных лиц (если получение их согласия предусмотрено) или на ином законном основании при условии сохранения конфиденциальности информации.
                </Paragraph>
                <Paragraph>
                    <b>Разглашение Конфиденциальной информации</b> – действие или бездействие, в результате которого Конфиденциальная информация в любой возможной форме (устной, письменной, иной форме, в том числе с использованием технических средств) становится известной третьим лицам без согласия Передающей стороны, а также согласия иных лиц (если получение их согласия предусмотрено).
                </Paragraph>
                <Header>
                    1. Общие положения.
                </Header>
                <Paragraph>
                    1.1. Стороны соглашаются считать весь объем информации, предоставляемой друг другу в рамках взаимодействия при установке Приложения, регистрации Пользователя, получения доступа к Сервису и использовании его функционала, конфиденциальной информацией (в пределах, допускаемых действующим законодательством РФ – коммерческой тайной).
                </Paragraph>
                <Paragraph>
                    1.2. В рамках настоящей Политики каждая из сторон в зависимости от того, раскрывает она или получает конфиденциальную информацию, может выступать как в качестве Принимающей стороны, так и в качестве Передающей стороны.
                </Paragraph>
                <Paragraph>
                    1.3. Положения настоящей Политики распространяются на Конфиденциальную информацию Стороны независимо от вида носителя, на котором она зафиксирована.
                </Paragraph>
                <Paragraph>
                    1.4. Информация, доступ к которой предоставляется Принимающей стороне без передачи материального носителя, и содержащаяся в информационных ресурсах, используемых Передающей стороной, включая Сервис Приложения, доступ к которым предоставляется Принимающей стороне без передачи материального носителя с использованием сети Интернет, в любом случае является Конфиденциальной информацией Передающей стороны, без дополнительного указания (требования) о сохранении ее конфиденциальности.
                </Paragraph>
                <Paragraph>
                    1.5. По каналам связи доступ к Конфиденциальной информации Передающей стороны производится при условии наличия у Принимающей стороны защищенных каналов передачи информации.
                </Paragraph>
                <Paragraph>
                    1.6. Передача и обработка конфиденциальной информации, относящейся к персональным данным, производится в соответствии с требованиями Конституции Российской Федерации, Федерального закона РФ от 27 июля 2006 года № 152-ФЗ «О персональных данных», настоящей Политики, Правил обработки персональных данных. Пользователи, присоединяясь к настоящей Политике, гарантируют выполнение требований действующего законодательства в части защиты информации.
                </Paragraph>
                <Header>
                    2. Обязательства.
                </Header>
                <Paragraph>
                    2.1. Каждая сторона, получающая конфиденциальную информацию (Получающая сторона) от другой стороны (Передающая сторона), не имеет права сообщать конфиденциальную информацию кому-либо без прямого на то разрешения Передающей стороны и должна принимать все разумные меры для защиты этой информации, включая, в частности меры, которые она принимает для защиты собственной конфиденциальной информации/коммерческой тайны.
                </Paragraph>
                <Paragraph>
                    Не является разглашением предоставление конфиденциальной информации третьим лицам при наличии у Передающей стороны письменного согласия другой стороны, на ее раскрытие.
                </Paragraph>
                <Paragraph>
                    2.2. Условия о конфиденциальности не распространяются на сведения, которые:
                </Paragraph>
                <Paragraph>
                    - являются либо становятся общеизвестными не по вине Принимающей стороны (при условии подтверждения соответствующими доказательствами);
                </Paragraph>
                <Paragraph>
                    - получены сторонами от третьих лиц и общедоступных источников информации, в том числе, но не ограничиваясь, в сети Интернет, без обязательства о сохранении конфиденциальности;
                </Paragraph>
                <Paragraph>
                    - сторона обязана раскрыть в соответствии с требованиями действующего законодательства. Такие сведения могут быть предоставлены только в адрес органов, имеющих необходимые полномочия, в порядке, установленном действующим законодательством.
                </Paragraph>
                <Paragraph>
                    2.3. Администрация принимает технические и организационно-правовые меры в целях обеспечения защиты информации, которую стороны предоставляют (передают, раскрывают) друг другу в ходе сотрудничества по предоставлению доступа к Сервису, и персональных данных Пользователя от неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий, путем внутренних проверок процессов сбора, хранения и обработки данных и мер безопасности, а также осуществления мер по обеспечению физической безопасности данных для предотвращения несанкционированного доступа к информации и персональным данным.
                </Paragraph>
                <Paragraph>
                    2.4. Администрация вправе агрегировать, систематизировать и анализировать получаемую от Пользователя информацию, в том числе конфиденциальную, с целью создания информационно-аналитических отчетов разного рода и баз данных, при этом Администрация гарантирует нераспространение и сохранность конфиденциальной информации, содержащейся в отчетах и базах данных в соответствии с Правилами и действующим законодательством. Обладателем исключительных прав на такие информационно-аналитические отчеты и базы данных, как на объекты интеллектуальной собственности, является Администрация.
                </Paragraph>
                <Paragraph>
                    2.5. Получающая сторона обязуется:
                </Paragraph>
                <Paragraph>
                    - использовать раскрытую информацию исключительно в целях реализации взаимодействия сторон в целях использования Приложения и предоставления доступа к Сервису;
                </Paragraph>
                <Paragraph>
                    - ограничить перечень лиц, имеющих доступ к конфиденциальной информации, исключительно своими сотрудниками, непосредственно участвующими во взаимодействии при реализации Правил.
                </Paragraph>
                <Paragraph>
                    2.6. Принимающая сторона обязуется соблюдать конфиденциальность в отношении Конфиденциальной информации Передающей стороны, в том числе не допускать ее разглашения и не использовать во вред Передающей стороне, и обеспечивать специальные меры охраны и использования Конфиденциальной информации Передающей стороны, при этом уровень охраны Конфиденциальной информации Передающей стороны не должен быть ниже, чем для охраны собственной конфиденциальной информации Принимающей стороны.
                </Paragraph>
                <Paragraph>
                    Принимающая сторона вправе самостоятельно определять способы защиты Конфиденциальной информации Передающей стороны.
                </Paragraph>
                <Header>
                    3. Ответственность. Разрешение споров.
                </Header>
                <Paragraph>
                    3.1. За каждое нарушение предусмотренных Политикой обязательств, Принимающая сторона обязуется возместить другой стороне документально подтвержденный реальный ущерб в полном объеме, возникший в результате такого нарушения.
                </Paragraph>
                <Paragraph>
                    3.2. Споры и разногласия между Сторонами, связанные с применением и/или использованием настоящей Политики, Стороны будут пытаться разрешить путем переговоров. При не достижении согласия споры подлежат рассмотрению в суде, в порядке, предусмотренном действующим законодательством Российской Федерации.
                </Paragraph>
                <Paragraph>
                    3.3. При разрешении споров Стороны применяют нормы права Российской Федерации.
                </Paragraph>
                <Header>
                    4. Срок действия. Прочие положения.
                </Header>
                <Paragraph>
                    4.1. Политика вступает в силу и становится обязательной для Сторон с момента принятия Пользователем Правил использования Сервиса Приложения, размещенными на сайте ПРИЛОЖЕНИЕ.ru по адресу: ____________ (присоединения к Правилам).
                </Paragraph>
                <Paragraph>
                    В случае несогласия с условиями Политики Пользователь обязуется прекратить использование Сервиса.
                </Paragraph>
                <Paragraph>
                    4.2. Прекращение Пользователем использования Сервиса Приложения не освобождает Принимающую сторону от исполнения обязательств, принятых в соответствии с настоящей Политикой в период использования Сервиса Приложения, в отношении Конфиденциальной информации Передающей стороны, переданной Принимающей стороне до прекращения действия настоящей Политики, а также не освобождает от ответственности, установленной законодательством Российской Федерации и настоящей Политикой.
                </Paragraph>
                <Paragraph>
                    4.3. Обязательства, установленные Политикой, в части охраны конфиденциальной информации, действительны в течение 3 (трех) лет с момента передачи конфиденциальной информации.
                </Paragraph>
                <Paragraph>
                    <b>Общество с ограниченной ответственностью «-----» (ООО «-----»)</b><br />
                    Юридический адрес: -------------------------<br />
                    ИНН ----- ОГРН -----<br />
                    Тел: ------------------------<br />
                    E-mail: ----------------------
                </Paragraph>
            </Card>
        </PageWrapper>
    )
}