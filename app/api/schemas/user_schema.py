from pydantic import BaseModel, Field
from typing import Optional, List


class PassportCreate(BaseModel):
    series: int
    number: int
    issued_by: str
    date_of_issue: str


class PassportSchema(PassportCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class MilitaryIDSchema(BaseModel):
    id: int
    status: str
    rank: str
    series: int
    number: int
    issued_by: str
    date_of_issue: str
    user_id: int

    class Config:
        from_attributes = True


class AddressCreate(BaseModel):
    passport_address: str
    fact_address: str
    passport_index: int
    fact_index: int


class AddressSchema(AddressCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class EducationSchema(BaseModel):
    id: int
    education_type: str
    name: str
    number: str
    degree: str
    date_of_end: str
    speciality: str
    user_id: int

    class Config:
        from_attributes = True


class PostEducationSchema(BaseModel):
    id: int
    education_type: str
    name: str
    number: str
    speciality: str
    user_id: int

    class Config:
        from_attributes = True


class LanguageSchema(BaseModel):
    id: int
    name: str
    user_id: int

    class Config:
        from_attributes = True


class SkillUpgradeSchema(BaseModel):
    id: int
    speciality: str
    name: str
    date_of_end: str
    user_id: int

    class Config:
        from_attributes = True


class WorkExperienceSchema(BaseModel):
    id: int
    name: str
    position: str
    date_of_start: str
    date_of_end: str
    user_id: int

    class Config:
        from_attributes = True


class GovAwardsSchema(BaseModel):
    id: int
    name: str
    user_id: int

    class Config:
        from_attributes = True


class StayAbroadSchema(BaseModel):
    id: int
    date_of_start: str
    date_of_end: str
    country: str
    goal: str
    user_id: int

    class Config:
        from_attributes = True


class FamilySchema(BaseModel):
    id: int
    relation_degree: str
    name: str
    birth_data: str
    place_of_work: str
    address: str
    user_id: int

    class Config:
        from_attributes = True


class CriminalLiabilitySchema(BaseModel):
    id: int
    status: bool
    text: str
    user_id: int

    class Config:
        from_attributes = True


class RecommendationSchema(BaseModel):
    id: int
    name: str
    place_of_work: str
    position: str
    phone_number: str
    user_id: int

    class Config:
        from_attributes = True


class UserFunc(BaseModel):
    name: str = Field(title="Имя пользователя")
    surname: str = Field(title="Фамилия пользователя")
    middle_name: str | None = Field(title="Отчество пользователя")
    sex: str = Field(title="Пол")
    birthday: str = Field(title="Дата рождения")
    place_of_birth: str = Field(title="Место рождения")
    citizenship: str = Field(title="Гражданство")
    snils: str = Field(title="СНИЛС")
    inn: str = Field(title="ИНН")
    phone_number: str = Field(title="Номер телефона")
    home_phone_number: str | None = Field(title="Домашний номер телефона")
    email: str = Field(title="Электронная почта")
    academic_degree: str | None = Field(title="Академическая степень")
    diplom: str | None = Field(title="Диплом")
    academic_tile: str | None = Field(title="Академическое звание")
    knowledge_for_work: str | None = Field(title="Знания для работы")
    old_achievements: str | None = Field(title="Прежние достижения")
    ad_disad: str | None = Field(title="Преимущества и недостатки")
    hobbies: str | None = Field(title="Хобби")
    hr_data: str | None = Field(title="HR данные")
    family_status: str | None = Field(title="Семейное положение")
    pc_experience: str | None = Field(title="Опыт работы с ПК")
    drivers_license: str | None = Field(title="Водительские права")
    first_24: bool = Field(title="Первая 24")
    second_24: bool = Field(title="Вторая 24")
    additional_information: str | None = Field(title="Дополнительная информация")
    date_of_completion: str | None = Field(title="Дата завершения")
    passport: Optional[PassportSchema]
    military_id: Optional[MilitaryIDSchema]
    addresses: List[AddressSchema] = []
    educations: List[EducationSchema] = []
    post_educations: List[PostEducationSchema] = []
    languages: List[LanguageSchema] = []
    skill_upgrades: List[SkillUpgradeSchema] = []
    works_experience: List[WorkExperienceSchema] = []
    government_awards: List[GovAwardsSchema] = []
    stays_abroad: List[StayAbroadSchema] = []
    relatives: List[FamilySchema] = []
    criminal_liabilities: List[CriminalLiabilitySchema] = []
    recommendations: List[RecommendationSchema] = []

    class Config:
        from_attributes = True


class User(BaseModel):
    id: int = Field(title="Айди бд")
    name: str = Field(title="Имя пользователя")
    surname: str = Field(title="Фамилия пользователя")
    middle_name: str | None = Field(title="Отчество пользователя")
    sex: str = Field(title="Пол")
    birthday: str = Field(title="Дата рождения")
    place_of_birth: str = Field(title="Место рождения")
    citizenship: str = Field(title="Гражданство")
    snils: str = Field(title="СНИЛС")
    inn: str = Field(title="ИНН")
    phone_number: str = Field(title="Номер телефона")
    home_phone_number: str | None = Field(title="Домашний номер телефона")
    email: str = Field(title="Электронная почта")
    academic_degree: str | None = Field(title="Академическая степень")
    diplom: str | None = Field(title="Диплом")
    academic_tile: str | None = Field(title="Академическое звание")
    knowledge_for_work: str | None = Field(title="Знания для работы")
    old_achievements: str | None = Field(title="Прежние достижения")
    ad_disad: str | None = Field(title="Преимущества и недостатки")
    hobbies: str | None = Field(title="Хобби")
    hr_data: str | None = Field(title="HR данные")
    family_status: str | None = Field(title="Семейное положение")
    pc_experience: str | None = Field(title="Опыт работы с ПК")
    drivers_license: str | None = Field(title="Водительские права")
    first_24: bool = Field(title="Первая 24")
    second_24: bool = Field(title="Вторая 24")
    additional_information: str | None = Field(title="Дополнительная информация")
    date_of_completion: str | None = Field(title="Дата завершения")
    passport: Optional[PassportSchema]
    military_id: Optional[MilitaryIDSchema]
    addresses: List[AddressSchema] = []
    educations: List[EducationSchema] = []
    post_educations: List[PostEducationSchema] = []
    languages: List[LanguageSchema] = []
    skill_upgrades: List[SkillUpgradeSchema] = []
    works_experience: List[WorkExperienceSchema] = []
    government_awards: List[GovAwardsSchema] = []
    stays_abroad: List[StayAbroadSchema] = []
    relatives: List[FamilySchema] = []
    criminal_liabilities: List[CriminalLiabilitySchema] = []
    recommendations: List[RecommendationSchema] = []

    class Config:
        from_attributes = True
