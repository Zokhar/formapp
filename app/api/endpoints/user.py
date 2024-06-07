from typing import List

from loguru import logger
from sqlalchemy.orm import Session
from sqlalchemy.exc import DataError
from fastapi import APIRouter, Depends, HTTPException

from core.database import models
from api.schemas import user_schema
from core.database.db import get_db

router = APIRouter()


@router.post("/users", response_model=user_schema.User)
def create_user(
        user_create: user_schema.UserFunc,
        db_session: Session = Depends(get_db)
):
    db_user = models.UserModel(
        name=user_create.name,
        surname=user_create.surname,
        middle_name=user_create.middle_name,
        sex=user_create.sex,
        birthday=user_create.birthday,
        place_of_birth=user_create.place_of_birth,
        citizenship=user_create.citizenship,
        snils=user_create.snils,
        inn=user_create.inn,
        phone_number=user_create.phone_number,
        home_phone_number=user_create.home_phone_number,
        email=user_create.email,
        academic_degree=user_create.academic_degree,
        diplom=user_create.diplom,
        academic_tile=user_create.academic_tile,
        knowledge_for_work=user_create.knowledge_for_work,
        old_achievements=user_create.old_achievements,
        ad_disad=user_create.ad_disad,
        hobbies=user_create.hobbies,
        hr_data=user_create.hr_data,
        family_status=user_create.family_status,
        pc_experience=user_create.pc_experience,
        drivers_license=user_create.drivers_license,
        first_24=user_create.first_24,
        second_24=user_create.second_24,
        additional_information=user_create.additional_information,
        date_of_completion=user_create.date_of_completion,
        languages=user_create.languages,
        government_awards=user_create.government_awards,
        criminal_liabilities=user_create.criminal_liabilities,
    )

    db_session.add(db_user)
    db_session.commit()
    db_session.refresh(db_user)

    if user_create.passport:
        db_passport = models.PassportModel(
            series=user_create.passport.series,
            number=user_create.passport.number,
            issued_by=user_create.passport.issued_by,
            date_of_issue=user_create.passport.date_of_issue,
            user_id=db_user.id
        )
        db_session.add(db_passport)

    if user_create.military_id:
        db_military_id = models.MilitaryIDModel(
            status=user_create.military_id.status,
            rank=user_create.military_id.rank,
            series=user_create.military_id.series,
            number=user_create.military_id.number,
            issued_by=user_create.military_id.issued_by,
            date_of_issue=user_create.military_id.date_of_issue,
            user_id=db_user.id
        )
        db_session.add(db_military_id)

    if user_create.addresses:
        db_address = models.AddressModel(
            passport_address=user_create.addresses.passport_address,
            fact_address=user_create.addresses.fact_address,
            passport_index=user_create.addresses.passport_index,
            fact_index=user_create.addresses.fact_index,
            user_id=db_user.id
        )
        db_session.add(db_address)

    for education in user_create.educations:
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

    for post_education in user_create.post_educations:
        db_post_education = models.PostEducationModel(
            education_type=post_education.education_type,
            name=post_education.name,
            number=post_education.number,
            speciality=post_education.speciality,
            user_id=db_user.id
        )
        db_session.add(db_post_education)

    for skill_upgrade in user_create.skill_upgrades:
        db_skill_upgrade = models.SkillUpgradeModel(
            speciality=skill_upgrade.speciality,
            name=skill_upgrade.name,
            date_of_end=skill_upgrade.date_of_end,
            user_id=db_user.id
        )
        db_session.add(db_skill_upgrade)

    for work_experience in user_create.works_experience:
        db_work_experience = models.WorkExperienceModel(
            name=work_experience.name,
            position=work_experience.position,
            date_of_start=work_experience.date_of_start,
            date_of_end=work_experience.date_of_end,
            user_id=db_user.id
        )
        db_session.add(db_work_experience)

    for stay_abroad in user_create.stays_abroad:
        db_stay_abroad = models.StayAbroadModel(
            date_of_start=stay_abroad.date_of_start,
            date_of_end=stay_abroad.date_of_end,
            country=stay_abroad.country,
            goal=stay_abroad.goal,
            user_id=db_user.id
        )
        db_session.add(db_stay_abroad)

    for family in user_create.relatives:
        db_family = models.FamilyModel(
            relation_degree=family.relation_degree,
            name=family.name,
            birth_data=family.birth_data,
            place_of_work=family.place_of_work,
            address=family.address,
            user_id=db_user.id
        )
        db_session.add(db_family)

    for recommendation in user_create.recommendations:
        db_recommendation = models.RecommendationModel(
            name=recommendation.name,
            place_of_work=recommendation.place_of_work,
            position=recommendation.position,
            phone_number=recommendation.phone_number,
            user_id=db_user.id
        )
        db_session.add(db_recommendation)

    db_session.commit()

    logger.info(f"Добавили анкету {db_user.id}")

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
