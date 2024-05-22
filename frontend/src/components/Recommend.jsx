import { createRecommend, doesRecommendExist, updateRecommend } from "../adapters/recommend-adapter";

const Recommend = ({programId, userId, update}) => {
  const handleChange = async (e) => {
    const recommend = e.target.value === "Yes";
    const [recommendation,error] = await doesRecommendExist(programId,userId)
    
    if (!recommendation) {
      const [updated] = await createRecommend({programId, userId, recommend});
      console.log(updated)
    } else {
      const [updated] = await updateRecommend(recommendation.id,recommend)
      console.log(updated)
    }
    update()
  }

  return (
    <>
    <br />
      <label htmlFor="recommend-form-radio">Would you recommend this opportunity?</label>
      <input onChange={handleChange} type="radio" name="recommend" id="recommend-form-radio1" value="Yes"/>
      <label htmlFor="recommend-form-radio">Yes</label>
      <input onChange={handleChange} type="radio" name="recommend" id="recommend-form-radio2" value="No"/>
      <label htmlFor="recommend-form-radio">No</label>
    <br />
    </>
  );
}

export default Recommend;
