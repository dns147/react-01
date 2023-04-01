export default function RadioTypeCrew() {
  return (
    <>
      <div className="radio-typeofcrew">
        <b>Type of crew: </b>
        <label>
          <input type="radio" name="typeCrew" value="military" />
          Military
        </label>
        <label>
          <input type="radio" name="typeCrew" value="civilian" />
          Civilian
        </label>
      </div>
    </>
  );
}
