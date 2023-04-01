export default function SelectPlanet() {
  return (
    <label id="select-planet">
      <b>Destination:</b>
      <select name="planet" defaultValue="">
        <option value="default"></option>
        <option value="mars">Mars</option>
        <option value="jupiter">Jupiter</option>
        <option value="saturn">Saturn</option>
        <option value="neptune">Neptune</option>
      </select>
    </label>
  );
}
