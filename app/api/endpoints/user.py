from typing import List

from loguru import logger
from sqlalchemy.orm import Session
from sqlalchemy.exc import DataError
from fastapi import APIRouter, Depends, HTTPException

from core.database import models
from api.schemas import user_schema
from core.database.db import get_db
from functions.form import create_pdf

router = APIRouter()


@router.post("/users", response_model=user_schema.User)
def create_user(
        user: user_schema.UserCreate,
        db_session: Session = Depends(get_db)
):
    db_user = models.UserModel(
        name=user.form.name,
        surname=user.form.surname,
        middle_name=user.form.middle_name,
        sex=user.form.sex,
        birthday=user.form.birthday,
        place_of_birth=user.form.place_of_birth,
        citizenship=user.form.citizenship,
        snils=user.form.snils,
        inn=user.form.inn,
        phone_number=user.form.phone_number,
        home_phone_number=user.form.home_phone_number,
        email=user.form.email,
        drivers_license=user.form.drivers_license,

        academic_degree=user.education.academic_degree,
        diplom=user.education.diplom,
        academic_tile=user.education.academic_tile,
        languages=user.education.languages,

        old_achievements=user.work_experience.old_achievements,
        knowledge_for_work=user.work_experience.knowledge_for_work,
        hobbies=user.work_experience.hobbies,
        hr_data=user.work_experience.hr_data,
        first_24=user.work_experience.first_24,
        second_24=user.work_experience.second_24,

        family_status=user.family.family_status,

        ad_disad=user.info.ad_disad,
        government_awards=user.info.government_awards,
        criminal_liabilities=user.info.criminal_liabilities,
        pc_experience=user.info.pc_experience,
        additional_information=user.info.additional_information,
        date_of_completion=user.info.date_of_completion,
    )

    db_session.add(db_user)
    db_session.commit()
    db_session.refresh(db_user)

    if user.form.passport:
        db_passport = models.PassportModel(
            series=user.form.passport.series,
            number=user.form.passport.number,
            issued_by=user.form.passport.issued_by,
            date_of_issue=user.form.passport.date_of_issue,
            user_id=db_user.id
        )
        db_session.add(db_passport)

    if user.form.military_id:
        db_military_id = models.MilitaryIDModel(
            status=user.form.military_id.status,
            rank=user.form.military_id.rank,
            series=user.form.military_id.series,
            number=user.form.military_id.number,
            issued_by=user.form.military_id.issued_by,
            date_of_issue=user.form.military_id.date_of_issue,
            user_id=db_user.id
        )
        db_session.add(db_military_id)

    if user.form.address:
        db_address = models.AddressModel(
            passport_address=user.form.address.passport_address,
            fact_address=user.form.address.fact_address,
            passport_index=user.form.address.passport_index,
            fact_index=user.form.address.fact_index,
            user_id=db_user.id
        )
        db_session.add(db_address)

    for education in user.education.educations:
        db_education = models.EducationModel(
            education_type=education.education_type,
            name=education.name,
            number=education.number,
            degree=education.degree,
            date_of_end=education.date_of_end,
            speciality=education.speciality,
            user_id=db_user.id
        )
        db_session.add(db_education)

    for post_education in user.education.post_educations:
        db_post_education = models.PostEducationModel(
            education_type=post_education.education_type,
            name=post_education.name,
            number=post_education.number,
            speciality=post_education.speciality,
            user_id=db_user.id
        )
        db_session.add(db_post_education)

    for skill_upgrade in user.education.skill_upgrades:
        db_skill_upgrade = models.SkillUpgradeModel(
            speciality=skill_upgrade.speciality,
            name=skill_upgrade.name,
            date_of_end=skill_upgrade.date_of_end,
            user_id=db_user.id
        )
        db_session.add(db_skill_upgrade)

    for work_experience in user.work_experience.works_experience:
        db_work_experience = models.WorkExperienceModel(
            name=work_experience.name,
            position=work_experience.position,
            date_of_start=work_experience.date_of_start,
            date_of_end=work_experience.date_of_end,
            user_id=db_user.id
        )
        db_session.add(db_work_experience)

    for recommendation in user.work_experience.recommendations:
        db_recommendation = models.RecommendationModel(
            name=recommendation.name,
            place_of_work=recommendation.place_of_work,
            position=recommendation.position,
            phone_number=recommendation.phone_number,
            user_id=db_user.id
        )
        db_session.add(db_recommendation)

    for family in user.family.relatives:
        db_family = models.FamilyModel(
            relation_degree=family.relation_degree,
            name=family.name,
            birth_data=family.birth_data,
            place_of_work=family.place_of_work,
            address=family.address,
            user_id=db_user.id
        )
        db_session.add(db_family)

    for stay_abroad in user.info.stays_abroad:
        db_stay_abroad = models.StayAbroadModel(
            date_of_start=stay_abroad.date_of_start,
            date_of_end=stay_abroad.date_of_end,
            country=stay_abroad.country,
            goal=stay_abroad.goal,
            user_id=db_user.id
        )
        db_session.add(db_stay_abroad)
    db_session.commit()

    logger.info(f"Добавили анкету {db_user.id}")
    create_pdf(db_user)
    return db_user


@router.get("/users", response_model=List[user_schema.User])
def get_all_users(db_session: Session = Depends(get_db)):
    db_users = db_session.query(models.UserModel).all()
    return db_users


@router.get("/users/{user_id}", response_model=user_schema.User)
def get_user(
        user_id: int,
        db_session: Session = Depends(get_db)
):
    db_user = db_session.query(models.UserModel).filter(models.UserModel.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    db_user.passport = db_session.query(models.PassportModel).filter(models.PassportModel.user_id == user_id).first()
    db_user.military_id = db_session.query(models.MilitaryIDModel).filter(
        models.MilitaryIDModel.user_id == user_id).first()
    db_user.addresses = db_session.query(models.AddressModel).filter(models.AddressModel.user_id == user_id).all()
    db_user.educations = db_session.query(models.EducationModel).filter(models.EducationModel.user_id == user_id).all()
    db_user.post_educations = db_session.query(models.PostEducationModel).filter(
        models.PostEducationModel.user_id == user_id).all()
    db_user.skill_upgrades = db_session.query(models.SkillUpgradeModel).filter(
        models.SkillUpgradeModel.user_id == user_id).all()
    db_user.works_experience = db_session.query(models.WorkExperienceModel).filter(
        models.WorkExperienceModel.user_id == user_id).all()
    db_user.stays_abroad = db_session.query(models.StayAbroadModel).filter(
        models.StayAbroadModel.user_id == user_id).all()
    db_user.relatives = db_session.query(models.FamilyModel).filter(models.FamilyModel.user_id == user_id).all()
    db_user.recommendations = db_session.query(models.RecommendationModel).filter(
        models.RecommendationModel.user_id == user_id).all()

    return db_user


@router.delete("/users/{user_id}")
def delete_user(user_id: int, db_session: Session = Depends(get_db)):
    db_user = db_session.query(models.UserModel).filter(models.UserModel.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    db_session.delete(db_user)
    db_session.commit()

    return {
        "id": db_user.id,
        "name": db_user.name,
        "surname": db_user.surname,
        "middle_name": db_user.middle_name,
    }


@router.delete("/delete_all")
def delete_all_records(db: Session = Depends(get_db)):
    try:
        db.query(models.PassportModel).delete()
        db.query(models.MilitaryIDModel).delete()
        db.query(models.AddressModel).delete()
        db.query(models.EducationModel).delete()
        db.query(models.PostEducationModel).delete()
        db.query(models.SkillUpgradeModel).delete()
        db.query(models.WorkExperienceModel).delete()
        db.query(models.StayAbroadModel).delete()
        db.query(models.FamilyModel).delete()
        db.query(models.RecommendationModel).delete()
        db.query(models.UserModel).delete()
        db.commit()
        return {"message": "All records have been deleted successfully."}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
