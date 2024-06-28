import smtplib
import mimetypes
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from email.mime.base import MIMEBase
from http.client import HTTPException

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase import pdfmetrics

pdfmetrics.registerFont(TTFont('DejaVu', 'functions/DejaVuSans.ttf'))


def create_pdf(user_data, file_path="user_report.pdf"):
    doc = SimpleDocTemplate(file_path, pagesize=A4)
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name='DejaVu', fontName='DejaVu', fontSize=12))
    styleDV = styles['DejaVu']

    # Добавление основной информации о пользователе
    story = [Paragraph(f"Отчет по пользователю: {user_data.name} {user_data.surname}", styleDV), Spacer(1, 12),
             Paragraph(f"Фамилия: {user_data.surname}", styleDV),
             Paragraph(f"Имя: {user_data.name}", styleDV),
             Paragraph(f"Отчество: {user_data.middle_name}", styleDV),
             Paragraph(f"Пол: {user_data.sex}", styleDV),
             Paragraph(f"Дата рождения: {user_data.birthday}", styleDV),
             Paragraph(f"Место рождения: {user_data.place_of_birth}", styleDV),
             Paragraph(f"Гражданство: {user_data.citizenship}", styleDV),
             Paragraph(f"Снилс: {user_data.snils}", styleDV),
             Paragraph(f"ИНН: {user_data.inn}", styleDV),
             Paragraph(f"Номер телефона мобильный: {user_data.phone_number}", styleDV),
             Paragraph(f"Номер телефона домашний: {user_data.home_phone_number}", styleDV),
             Paragraph(f"E-mail: {user_data.email}", styleDV),
             Spacer(1, 12)]

    # Добавление паспорта
    if user_data.passport:
        story.append(Paragraph("Паспорт:", styleDV))
        story.append(Paragraph(f"Серия: {user_data.passport.series} №: {user_data.passport.number}", styleDV))
        story.append(Paragraph(f"Кем выдан: {user_data.passport.issued_by}", styleDV))
        story.append(Paragraph(f"Дата выдачи: {user_data.passport.date_of_issue}", styleDV))
        story.append(Spacer(1, 12))

    # Добавление адреса
    if user_data.address:
        story.append(Paragraph("1. Адрес места жительства:", styleDV))
        story.append(Paragraph(f"Паспортный адрес: {user_data.address.passport_address}", styleDV))
        story.append(Paragraph(f"Фактический адрес: {user_data.address.fact_address}", styleDV))
        story.append(Paragraph(f"Паспортный индекс: {user_data.address.passport_index}", styleDV))
        story.append(Paragraph(f"Фактический индекс: {user_data.address.fact_index}", styleDV))
        story.append(Spacer(1, 12))

    # Добавление военного билета
    if user_data.military_id:
        story.append(Paragraph("2. Отношение к воинской обязанности:", styleDV))
        story.append(Paragraph(f"Статус: {user_data.military_id.status}", styleDV))
        story.append(Paragraph(f"Звание: {user_data.military_id.rank}", styleDV))
        story.append(Paragraph(f"Серия: {user_data.military_id.series}", styleDV))
        story.append(Paragraph(f"Номер: {user_data.military_id.number}", styleDV))
        story.append(Paragraph(f"Кем выдан: {user_data.military_id.issued_by}", styleDV))
        story.append(Paragraph(f"Дата выдачи: {user_data.military_id.date_of_issue}", styleDV))
        story.append(Spacer(1, 12))

    # Добавление образования
    if user_data.educations:
        story.append(Paragraph("3. Образование:", styleDV))
        for education in user_data.educations:
            story.append(Paragraph(f"Тип образования: {education.education_type}", styleDV))
            story.append(Paragraph(f"Название: {education.name}", styleDV))
            story.append(Paragraph(f"Номер: {education.number}", styleDV))
            story.append(Paragraph(f"Степень: {education.degree}", styleDV))
            story.append(Paragraph(f"Дата окончания: {education.date_of_end}", styleDV))
            story.append(Paragraph(f"Специальность: {education.speciality}", styleDV))
            story.append(Spacer(1, 12))

    # Добавление послевузовского образования
    if user_data.post_educations:
        story.append(Paragraph("4. Послевузовское образование:", styleDV))
        for education in user_data.post_educations:
            story.append(Paragraph(f"Тип образования: {education.education_type}", styleDV))
            story.append(Paragraph(f"Название: {education.name}", styleDV))
            story.append(Paragraph(f"Номер: {education.number}", styleDV))
            story.append(Paragraph(f"Специальность: {education.speciality}", styleDV))
            story.append(Spacer(1, 12))

    story.append(Paragraph(f"5. Ученая степень: {user_data.academic_degree}", styleDV))
    story.append(Paragraph(f"6. Диплом: {user_data.diplom}", styleDV))
    story.append(Paragraph(f"7. Ученое звание: {user_data.academic_tile}", styleDV))
    story.append(Paragraph(f"8. Знание иностранных языков, языков народов РФ: {user_data.languages}", styleDV))

    # Добавление повышения квалификации и переподготовки
    if user_data.skill_upgrades:
        story.append(Paragraph("9. Повышение квалификации и переподготовка:", styleDV))
        for education in user_data.skill_upgrades:
            story.append(Paragraph(f"Название: {education.name}", styleDV))
            story.append(Paragraph(f"Специальность: {education.speciality}", styleDV))
            story.append(Paragraph(f"Дата окончания: {education.date_of_end}", styleDV))
            story.append(Spacer(1, 12))

    # Добавление опыта работы
    if user_data.works_experience:
        story.append(Paragraph(
            "10. Выполняемая работа с начала трудовой деятельности (включая учебу в высших и средних специальных учебных заведениях, военную службу, работу по совместительству, предпринимательскую деятельность и т.п.)",
            styleDV))
        for work in user_data.works_experience:
            story.append(Paragraph(f"Название: {work.name}", styleDV))
            story.append(Paragraph(f"Позиция: {work.position}", styleDV))
            story.append(Paragraph(f"Дата начала: {work.date_of_start}", styleDV))
            story.append(Paragraph(f"Дата окончания: {work.date_of_end}", styleDV))
            story.append(Spacer(1, 12))

    story.append(Paragraph(
        f"11. Опыт работы и/или знания, которые на Ваш взгляд могли бы быть использованы при работе: {user_data.knowledge_for_work}",
        styleDV))
    story.append(Paragraph(
        f"12. Какие из своих достижений на прежних местах работы Вы считаете самыми важными: {user_data.old_achievements}",
        styleDV))
    story.append(Paragraph(f"13. Преимущества и недостатки: {user_data.ad_disad}", styleDV))
    story.append(Paragraph(f"14. Ваши увлечения: {user_data.hobbies}", styleDV))
    story.append(Paragraph(
        f"15. Фамилия, имя, отчество и телефон руководителя кадровой службы (непосредственного руководителя) на прежнем месте работы (заполняется обязательно): {user_data.hr_data}",
        styleDV))
    story.append(Paragraph(f"16. Имеете ли Вы государственные награды, почетные звания: {user_data.government_awards}", styleDV))

    # Добавление пребывания за границей
    if user_data.stays_abroad:
        story.append(Paragraph("17. Пребывание за границей:", styleDV))
        for stay in user_data.stays_abroad:
            story.append(Paragraph(f"Дата начала: {stay.date_of_start}", styleDV))
            story.append(Paragraph(f"Дата окончания: {stay.date_of_end}", styleDV))
            story.append(Paragraph(f"Страна: {stay.country}", styleDV))
            story.append(Paragraph(f"Цель: {stay.goal}", styleDV))
            story.append(Spacer(1, 12))

    story.append(Paragraph(f"18. Cемейное положение на момент заполнения личного листка: {user_data.family_status}", styleDV))

    # Добавление информации о семье
    if user_data.relatives:
        story.append(Paragraph("19. Ваши близкие родственники (дети, жена, муж, отец, мать, взрослые братья, сестры):", styleDV))
        for relative in user_data.relatives:
            story.append(Paragraph(f"Степень родства: {relative.relation_degree}", styleDV))
            story.append(Paragraph(f"Имя: {relative.name}", styleDV))
            story.append(Paragraph(f"Дата рождения: {relative.birth_data}", styleDV))
            story.append(Paragraph(f"Место работы: {relative.place_of_work}", styleDV))
            story.append(Paragraph(f"Адрес: {relative.address}", styleDV))
            story.append(Spacer(1, 12))

    story.append(Paragraph(f"20. Уголовная ответственность: {user_data.criminal_liabilities}", styleDV))
    story.append(Paragraph(f"21. Опыт работы на персональном компьютере : {user_data.pc_experience}", styleDV))
    story.append(Paragraph(f"22. Имеете ли Вы водительское удостоверение : {user_data.drivers_license}", styleDV))

    # Добавление рекомендаций
    if user_data.recommendations:
        story.append(Paragraph("23. Рекомендации должностных лиц Банка и/или других структур АКБ «Алмазэргиэнбанк» АО если таковые имеются:", styleDV))
        for recommendation in user_data.recommendations:
            story.append(Paragraph(f"Имя: {recommendation.name}", styleDV))
            story.append(Paragraph(f"Место работы: {recommendation.place_of_work}", styleDV))
            story.append(Paragraph(f"Позиция: {recommendation.position}", styleDV))
            story.append(
                Paragraph(f"Номер телефона: {recommendation.phone_number}", styleDV))
            story.append(Spacer(1, 12))

    # Добавление других данных пользователя
    story.append(Paragraph(f"24. Стаж работы в государственной или муниципальной службе за последние 2 года  (есть  / нет), если есть", styleDV))
    story.append(Paragraph(f"24.1 Входили ли в Ваши должностные (служебные) обязанности отдельные функции по управлению АКБ «Алмазэргиэнбанк»: {user_data.first_24}", styleDV))
    story.append(Paragraph(f"24.2 Требуется ли согласие соответствующей комиссии по соблюдению требований к служебному поведению государственных или муниципальных служащих и урегулированию конфликта интересов (да / нет): {user_data.second_24}", styleDV))
    story.append(Paragraph(f"25: Дополнительная информация: {user_data.additional_information}", styleDV))
    story.append(Paragraph(f"Дата завершения: {user_data.date_of_completion}", styleDV))

    doc.build(story)


async def send_mail():
    file = "user_report.pdf"
    password = "ptgs awwe dexb wkii"
    sender = "kronter1337@gmail.com"
    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    try:
        server.login(sender, password)
        msg = MIMEMultipart()
        msg['From'] = sender
        msg['To'] = sender
        msg['Subject'] = "User Report"
        ftype, encoding = mimetypes.guess_type(file)
        file_type, sub_type = ftype.split('/')
        with open(file, 'rb') as f:
            file = MIMEApplication(f.read(), sub_type)

        file.add_header('Content-Disposition', 'attachment', filename="user_report.pdf")
        msg.attach(file)
        server.sendmail(sender, sender, msg.as_string())
        server.quit()
        return {"message": "Mail has been sent successfully."}
    except Exception as e:
        server.quit()
        raise HTTPException(status_code=500, detail=str(e))