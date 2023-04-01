export default function CheckboxAccess() {
  return (
    <>
      <div className="checkbox-access">
        <b>Get access:</b>
        <label>
          Control module:
          <input type="checkbox" aria-label="access-input" name="access" value="control" />
        </label>
        <label>
          Cargo module:
          <input type="checkbox" name="access" value="cargo" />
        </label>
        <label>
          Engine module:
          <input type="checkbox" name="access" value="engine" />
        </label>
        <label>
          Crew module:
          <input type="checkbox" name="access" value="crew" />
        </label>
        <label>
          Medical module:
          <input type="checkbox" name="access" value="medical" />
        </label>
      </div>
    </>
  );
}
