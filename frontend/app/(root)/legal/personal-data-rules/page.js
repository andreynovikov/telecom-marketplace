import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'

import PageWrapper from '@/components/ui/page-wrapper'
import BoxLink from '@/components/theme/pages-sections/sessions/components/box-link'

import { address, inn, name, ogrn, phone } from '@/lib/settings'

const Header = ({ children }) => <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>{children}</Typography>
const Paragraph = ({ children }) => <Typography sx={{ mb: 1 }}>{children}</Typography>

export default async function PrivacyPolicy() {
    return (
        <PageWrapper title="Правила обработки персональных данных">
            <Card sx={{ p: 3 }}>
                <Paragraph>
                    Правила обработки персональных данных Общества с ограниченной ответственностью «{name}» (сокращенное наименование - ООО «{name}» (ИНН {inn}, ОГРН {ogrn}) разработаны в соответствии с положениями законодательства Российской Федерации{/* и Правилами использования Сервиса Приложения, размещенными на сайте ПРИЛОЖЕНИЕ.ru по адресу: _____________*/}.
                </Paragraph>
                <Paragraph>
                    Правила ПДн являются приложением к Правилам использования Сервиса Приложения и их неотъемлемой частью. Принимая условия Правил использования Сервиса Приложения, Пользователь автоматически принимает условия настоящих Правил ПДн.
                </Paragraph>
                <Header>
                    Термины и определения.
                </Header>
                <Paragraph>
                    <b>Стороны</b> – Администрация и любой зарегистрированный в Приложении Пользователь.
                </Paragraph>
                <Paragraph>
                    <b>Персональные данные (ПДн)</b> — любая информация, относящаяся прямо или косвенно к определенному или определяемому физическому лицу (субъекту персональных данных).
                </Paragraph>
                <Paragraph>
                    <b>Обработка персональных данных</b> — любое действие (операция) или совокупность действий (операций), совершаемых с использованием средств автоматизации или без использования таких средств с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передачу (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных.
                </Paragraph>
                <Paragraph>
                    <b>Распространение персональных данных</b> — действия, направленные на раскрытие персональных данных неопределенному кругу лиц.
                </Paragraph>
                <Paragraph>
                    <b>Предоставление персональных данных</b> — действия, направленные на раскрытие персональных данных определенному лицу или определенному кругу лиц.
                </Paragraph>
                <Paragraph>
                    <b>Блокирование персональных данных</b> — временное прекращение обработки персональных данных (за исключением случаев, если обработка необходима для уточнения персональных данных);
                </Paragraph>
                <Paragraph>
                    <b>Уничтожение персональных данных</b> — действия, в результате которых становится невозможным восстановить содержание персональных данных в информационной системе персональных данных и (или) в результате которых уничтожаются материальные носители персональных данных;
                </Paragraph>
                <Paragraph>
                    <b>Обезличивание персональных данных</b> — действия, в результате которых становится невозможным без использования дополнительной информации определить принадлежность персональных данных конкретному субъекту персональных данных.
                </Paragraph>
                <Paragraph>
                    <b>Информация</b> — сведения (сообщения, данные) независимо от формы их представления.
                </Paragraph>
                <Paragraph>
                    <b>Документированная информация</b> — зафиксированная на материальном носителе путем документирования информация с реквизитами, позволяющими определить такую информацию или ее материальный носитель.
                </Paragraph>
                <Paragraph>
                    <b>Конфиденциальность персональных данных</b> - обязательное для соблюдения Администрацией или иным получившим доступ к персональным данным лицом требование не допускать их распространения без согласия субъекта персональных данных или наличия иного законного основания.
                </Paragraph>
                <Header>
                    1. Общие положения.
                </Header>
                <Paragraph>
                    1.1. Правила ПДн устанавливают обязательства Администрации по неразглашению и обеспечению режима защиты конфиденциальности персональных данных, которые Пользователь предоставляет.
                </Paragraph>
                <Paragraph>
                    1.2. Использование Сервиса Пользователем означает согласие с Правилами ПДн и условиями обработки Администрацией персональных данных Пользователя.
                </Paragraph>
                <Paragraph>
                    В случае несогласия с условиями Правил ПДн Пользователь обязуется прекратить использование Сервиса.
                </Paragraph>
                <Paragraph>
                    1.3. Персональные данные, разрешенные к обработке в рамках настоящих Правил ПДн, предоставляются Пользователем добровольно путем заполнения различных форм при регистрации в Приложении и использовании Сервиса и включают в себя следующую информацию: фамилия, имя, отчество, дату, месяц и год рождения, данные документа, удостоверяющего личность (паспорта), номер ИНН, фото и видео своего личного изображения, номер телефона, адрес регистрации, другую аналогичную информацию, сообщённую о себе Пользователем, и на основании которой возможна идентификация субъекта персональных данных.
                </Paragraph>
                <Paragraph>
                    1.4. Администрация вправе осуществлять с полученными персональными данными Пользователей все законные необходимые действия, связанные исключительно с достижением целей, обозначенных в разделе 2 Правил.
                </Paragraph>
                <Paragraph>
                    1.5. Любая иная персональная и конфиденциальная информация, неоговоренная выше подлежит надежному хранению и нераспространению Администрацией и Пользователем.
                </Paragraph>
                <Header>
                    2. Основные принципы и цели сбора персональной информации.
                </Header>
                <Paragraph>
                    2.1. Администрация обрабатывает персональные данные, которые необходимы для предоставления Сервиса Пользователю.
                </Paragraph>
                <Paragraph>
                    2.2. Настоящим, Пользователь поручает Администрации и соглашается с тем, что Администрация:
                </Paragraph>
                <Paragraph>
                    - обрабатывает персональные данные Пользователя в целях предоставления доступа к Сервису и его функционалу, проверки, исследования и анализа таких данных, позволяющих поддерживать и улучшать действующий функционал Сервиса, разрабатывать новый функционал, а также в иных, предусмотренных настоящими Правилами ПДн, целях;
                </Paragraph>
                <Paragraph>
                    - принимает все необходимые меры для защиты персональных данных Пользователя от неправомерного доступа, изменения, раскрытия или уничтожения;
                </Paragraph>
                <Paragraph>
                    - предоставляет доступ к персональным данным Пользователя только тем работникам, подрядчикам и агентам Администрации, которым эта информация необходима для обеспечения функционирования Сервиса и предоставления Пользователям доступа к его использованию;
                </Paragraph>
                <Paragraph>
                    - будет и вправе использовать предоставленную Пользователем информацию, в том числе персональные данные, в целях обеспечения соблюдения требований действующего законодательства Российской Федерации (в том числе в целях предупреждения и/или пресечения незаконных и/или противоправных действий Пользователей).
                </Paragraph>
                <Paragraph>
                    2.3. Принципы обработки персональных данных Пользователей:
                </Paragraph>
                <Paragraph>
                    - обработка персональных данных должна осуществляться исключительно на законных основаниях и в интересах Пользователей;
                </Paragraph>
                <Paragraph>
                    - обработка персональных данных должна ограничиваться достижением конкретных законных целей;
                </Paragraph>
                <Paragraph>
                    - при обработке персональных данных обеспечивается точность, достаточность, а в необходимых случаях актуальность персональных данных;
                </Paragraph>
                <Paragraph>
                    - хранение персональных данных должно осуществляться в форме, позволяющей определить субъекта персональных данных, не дольше, чем этого требуют цели обработки персональных данных.
                </Paragraph>
                <Paragraph>
                    2.4. Персональные данные Пользователя Администрация обрабатывает в целях:
                </Paragraph>
                <Paragraph>
                    - исполнения соглашений с Пользователем по предоставлению доступа к функционалу Сервиса, для администрирования Сервиса;
                </Paragraph>
                <Paragraph>
                    - идентификации Пользователя при регистрации в Приложении и аутентификации Пользователя при использовании Сервиса;
                </Paragraph>
                <Paragraph>
                    - оказания услуг, обработки запросов и заявок от Пользователя;
                </Paragraph>
                <Paragraph>
                    - установления с Пользователем обратной связи, включая направление уведомлений и запросов;
                </Paragraph>
                <Paragraph>
                    - подтверждения полноты персональных данных, предоставленных Пользователем;
                </Paragraph>
                <Paragraph>
                    - заключения с Пользователем договоров, осуществления взаиморасчетов;
                </Paragraph>
                <Paragraph>
                    - сбора статистики;
                </Paragraph>
                <Paragraph>
                    - улучшения качества Сервиса, удобства его использования и разработки новых сервисов и услуг;
                </Paragraph>
                <Paragraph>
                    - проведения маркетинговых (рекламных) мероприятий, направления предложений, продвижения на рынке услуг путем осуществления прямых контактов с потенциальным потребителем.
                </Paragraph>
                <Paragraph>
                    2.5. Пользователь осведомлен и согласен, что для целей, предусмотренных в Правилах ПДн, Администрация вправе:
                </Paragraph>
                <Paragraph>
                    - собирать и использовать дополнительную информацию, связанную с Пользователем, получаемую в процессе доступа Пользователя к Сервису или от третьих лиц, и включающую в себя данные о технических средствах (в том числе, мобильных устройствах) и способах технологического взаимодействия с Сервисом (в т. ч. IP-адрес хоста, вид операционной системы Пользователя, тип браузера, географическое положение, данные о провайдере и иное), об активности Пользователя на Сервисе, Cookie, об информации об ошибках, выдаваемых Пользователям, о скачанных файлах, видео, инструментах, а также иные данные, получаемые установленными Правилами ПДн способами;
                </Paragraph>
                <Paragraph>
                    - распоряжаться статистической информацией, связанной с функционированием Сервиса, а также информацией Пользователей для целей организации функционирования и технической поддержки Сервиса и исполнения условий настоящих Правил.
                </Paragraph>
                <Header>
                    3. Условия обработки персональной информации.
                </Header>
                <Paragraph>
                    3.1. Обработка персональных данных Пользователя осуществляется в сроки, определенные п.3.5 Правил ПДн, любым законным способом, в том числе в информационных системах персональных данных, с использованием средств автоматизации (в виде электронных образов документов), за исключением случаев, когда неавтоматизированная обработка персональных данных необходима в связи с исполнением требований законодательства. Обработка персональных данных Пользователей осуществляется в соответствии с Конституцией Российской Федерацией, Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных», настоящими Правилами ПДн.
                </Paragraph>
                <Paragraph>
                    3.2. Источником информации обо всех персональных данных Пользователя является непосредственно сам Пользователь Сервиса. Заполняя любую форму и/или прикрепляя файл при регистрации в Приложении и при использовании Сервиса, Пользователь тем самым дает согласие на обработку его персональных данных для целей, указанных в разделе 2 Правил ПДн. Пользователь подтверждает права и обязательства в отношении созданной таким образом своей учетной записи.
                </Paragraph>
                <Paragraph>
                    3.3. В отношении персональной информации Пользователя сохраняется ее конфиденциальность, кроме случаев добровольного предоставления Пользователем информации о себе для общего доступа неограниченному кругу лиц. При использовании Сервиса Пользователь соглашается с тем, что определенная часть его персональной информации в результате действий Пользователя становится общедоступной для других Пользователей Сервиса и пользователей сети Интернет, может быть скопирована и/или распространена такими Пользователями, с учетом доступных настроек конфиденциальности.
                </Paragraph>
                <Paragraph>
                    Общедоступной, является, в частности, следующая персональная информация Пользователей: фамилия, имя, отчество, номер телефона, серия и номер паспорта, закрытые маской (например, 65** 04***2).
                </Paragraph>
                <Paragraph>
                    3.4. Администрация принимает необходимые организационные и технические меры для защиты персональной информации Пользователя от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.
                </Paragraph>
                <Paragraph>
                    3.5. Администрация хранит информацию о Пользователе в течение периода предоставления последнему доступа к Сервису, а также 3 (трех) месяцев с момента прекращения такого доступа по любым основаниям. В случае получения Администрацией заявления от Пользователя об отзыве согласия на обработку ПДн, Администрация прекращает обработку ПДн Пользователя с даты, указанной в заявлении, но не ранее даты, следующей за датой фактического получения Администрацией отзыва.
                </Paragraph>
                <Paragraph>
                    3.6. Администрация осуществляет хранение персональных данных Пользователя и его сотрудников. При этом, Пользователь гарантирует, что получил согласие каждого своего сотрудника на передачу его персональных данных Администрации.
                </Paragraph>
                <Paragraph>
                    Администрация, являясь обработчиком персональных данных по поручению Пользователя, не обязана получать согласие сотрудников Пользователя на обработку их персональных данных. Безоговорочно принимая условия настоящих Правил, Пользователь подтверждает, что он заблаговременно получил согласие своих сотрудников на передачу Администрации их персональных данных.
                </Paragraph>
                <Paragraph>
                    Ответственность перед сотрудниками Пользователя, чьи персональные данные обрабатываются Администрацией по поручению Пользователя, Пользователь несет самостоятельно.
                </Paragraph>
                <Paragraph>
                    Администрация обрабатывает персональные данные сотрудников Пользователя полностью в соответствии с положениями, предусмотренными настоящими Правилами.
                </Paragraph>
                <Paragraph>
                    3.7. Администрация осуществляет обработку персональных данных следующими способами: сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, передача (распространение, предоставление, доступ), обезличивание, блокирование, удаление, уничтожение персональных данных Пользователя.
                </Paragraph>
                <Paragraph>
                    Хранение Персональных данных Пользователей осуществляется исключительно на электронных носителях и обрабатываются с использованием автоматизированных систем, за исключением случаев, когда неавтоматизированная обработка персональных данных необходима в связи с исполнением требований законодательства.
                </Paragraph>
                <Paragraph>
                    3.8. Администрация может осуществлять передачу персональных данных Пользователей, включая трансграничную передачу на территорию иностранных государств, при условии получения согласия Пользователя и обеспечения необходимой защиты прав субъектов персональных данных, контрагентам Администрации, которые привлекаются Администрацией для оказания услуг по поддержанию надлежащего технического состояния, работоспособности, модификации Сервиса. При этом хранение персональных данных граждан Российской Федерации за рубежом не осуществляется.
                </Paragraph>
                <Paragraph>
                    3.9. Если Пользователь не согласен с обработкой Администрацией его персональных, в том числе биометрических, данных, Пользователь не должен публиковать эту информацию или сообщать эти данные при регистрации в Приложении и использовании Сервиса. Как только Пользователь предоставит свои персональные, в том числе биометрические, данные при регистрации в Приложении и использовании Сервиса Сервису, они будут доступны Администрации, другим пользователям Сервиса.
                </Paragraph>
                <Header>
                    4. Обязательства сторон.
                </Header>
                <Paragraph>
                    4.1. Пользователь обязан:
                </Paragraph>
                <Paragraph>
                    - Предоставить корректную информацию о персональных данных, необходимую для целей, указанных в разделе 2 Правил ПДн.
                </Paragraph>
                <Paragraph>
                    - Обновить, дополнить предоставленную информацию о персональных данных в случае изменения данной информации.
                </Paragraph>
                <Paragraph>
                    4.2. Администрация обязана:
                </Paragraph>
                <Paragraph>
                    - Использовать полученную информацию исключительно для целей, указанных в разделе 2 Правил ПДн.
                </Paragraph>
                <Paragraph>
                    - Обеспечить хранение конфиденциальной информации в тайне.
                </Paragraph>
                <Paragraph>
                    - Принимать меры предосторожности для защиты конфиденциальности персональных данных Пользователя согласно порядку, обычно используемого для защиты такого рода информации в существующем деловом обороте.
                </Paragraph>
                <Paragraph>
                    - Осуществить блокирование персональных данных, относящихся к соответствующему Пользователю, с момента обращения или запроса Пользователя, или его законного представителя, либо уполномоченного органа по защите прав субъектов персональных данных на период проверки, в случае выявления недостоверных персональных данных или неправомерных действий.
                </Paragraph>
                <Paragraph>
                    4.3. Администрация при обработке персональных данных обязана принимать необходимые правовые, организационные и технические меры для защиты персональных данных от несанкционированного, неправомерного или случайного доступа к ним, уничтожения, изменения, блокирования, копирования, предоставления, распространения персональных данных, а также от иных неправомерных действий в отношении персональных данных, путем:
                </Paragraph>
                <Paragraph>
                    - разработки и внедрения в организации документов, регламентирующих работу с ПДн;
                </Paragraph>
                <Paragraph>
                    - ограничения и регламентации состава работников, имеющих доступ к персональным данным;
                </Paragraph>
                <Paragraph>
                    - реализации разрешительной системы доступа Пользователей к информационным ресурсам, программно-аппаратным средствам обработки и защиты информации;
                </Paragraph>
                <Paragraph>
                    - осуществления антивирусного контроля, предотвращения внедрения в корпоративную сеть вредоносных программ (программ-вирусов) и программных закладок;
                </Paragraph>
                <Paragraph>
                    - обнаружения вторжений в корпоративную сеть Администрации, нарушающих или создающих предпосылки к нарушению установленных требований по обеспечению безопасности персональных данных;
                </Paragraph>
                <Paragraph>
                    - резервного копирование информации.
                </Paragraph>
                <Paragraph>
                    4.4. При определении объема и содержания обрабатываемых персональных данных Администрация руководствуется Конституцией Российской Федерации, Федеральным закон от 27.07.2006 № 152-ФЗ «О персональных данных», настоящими Правилами ПДн.
                </Paragraph>
                <Paragraph>
                    4.5. Администрация обязуется обеспечить недопущение несанкционированного и нецелевого доступа к персональным данным Пользователей Сервиса.
                </Paragraph>
                <Paragraph>
                    При этом санкционированным и целевым доступом к персональным данным Пользователей Сервиса будет считаться доступ уполномоченных Администрацией лиц в рамках целей деятельности и тематике Сервиса.
                </Paragraph>
                <Header>
                    5. Ответственность сторон и разрешение споров.
                </Header>
                <Paragraph>
                    5.1. Администрация, не исполнившая свои обязательства, несёт ответственность перед Пользователем за прямой фактический ущерб в связи с неправомерным использованием персональных данных в соответствии с законодательством Российской Федерации.
                </Paragraph>
                <Paragraph>
                    5.2. В случае утраты или разглашения персональных данных Администрация не несёт ответственность, если данная информация:
                </Paragraph>
                <Paragraph>
                    - стала публичным достоянием до её утраты или разглашения;
                </Paragraph>
                <Paragraph>
                    - была получена от третьей стороны до момента её получения Администрацией;
                </Paragraph>
                <Paragraph>
                    - была разглашена с согласия Пользователя.
                </Paragraph>
                <Paragraph>
                    5.3. К Правилам ПДн и отношениям между Пользователем и Администрацией применяется действующее законодательство Российской Федерации.
                </Paragraph>
                <Paragraph>
                    В случае возникновения любых споров или разногласий, связанных с исполнением Правил ПДн, Пользователь и Администрация приложат все усилия для их разрешения путем проведения переговоров между ними. В случае, если споры не будут разрешены путем переговоров, споры подлежат разрешению в порядке, установленном действующим законодательством Российской Федерации.
                </Paragraph>
                <Paragraph>
                    5.4. До обращения в суд с иском по спорам, возникающим из отношений между Пользователем и Администрацией, обязательным является предъявление претензии.
                </Paragraph>
                <Paragraph>
                    Получатель претензии в течение 10 (десяти) дней со дня получения претензии, письменно уведомляет заявителя претензии о результатах ее рассмотрения.
                </Paragraph>
                <Paragraph>
                    При не достижении соглашения спор будет передан на рассмотрение в судебный орган в соответствии с действующим законодательством Российской Федерации.
                </Paragraph>
                <Header>
                    6. Заключительные положения.
                </Header>
                <Paragraph>
                    6.1. Настоящие Правила ПДн действуют в течение неопределенного срока, а в части согласия Пользователя на обработку ПДн - до момента его отзыва Пользователем путем направления соответствующего уведомления на электронный адрес Администрации, а также путем письменного обращения по юридическому адресу Администрации. Выбранный способ обращения должен гарантировать возможность Администрации достоверно идентифицировать обратившееся лицо.
                </Paragraph>
                <Paragraph>
                    6.2. Правила ПДн являются открытым и общедоступным документом, располагаются на сайте simarket.onlne по адресу: <BoxLink href="/legal/personal-data-rules" title="https://simarket.online/legal/personal-data-rules" />.
                </Paragraph>
                <Paragraph>
                    6.3. Пользователь может обратиться к Администрации с требованием об уточнении, изменении, блокировании, отзыве и т.д. своих персональных данных по адресу {address}.
                </Paragraph>
                <Paragraph>
                    <b>Общество с ограниченной ответственностью «{name}» (ООО «{name}»)</b><br />
                    Юридический адрес: {address}<br />
                    ИНН {inn} ОГРН {ogrn}<br />
                    Тел: {phone}<br />
                </Paragraph>
            </Card>
        </PageWrapper>
    )
}
