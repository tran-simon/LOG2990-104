/* tslint:disable:no-string-literal no-magic-numbers */
import { Coordinate } from '../../utils/math/coordinate';
import { CompositeParticle } from './composite-particle';

describe('CompositeParticle', () => {
  let compositeParticle: CompositeParticle;
  beforeEach(() => {
    compositeParticle = new CompositeParticle();
  });
  it('should create an instance', () => {
    expect(compositeParticle).toBeTruthy();
  });
  it('should init with empty particles array', () => {
    expect(compositeParticle.particles.length).toEqual(0);
  });
  it('should have radius of 1 on invalid input', () => {
    compositeParticle.radius = Number.NaN;
    expect(compositeParticle.radius).toEqual(1);
  });
  it('should have positive radius on negative input', () => {
    compositeParticle.radius = -1;
    expect(compositeParticle.radius).toEqual(1);
  });
  it('should add frequency amount of particles on addParticle call', () => {
    compositeParticle.frequency = 10;
    compositeParticle.addParticle(new Coordinate());
    expect(compositeParticle.particles.length).toEqual(10);
  });
  it('should have positive loop index on negative frequency input', () => {
    compositeParticle.frequency = -10;
    compositeParticle.addParticle(new Coordinate());
    expect(compositeParticle.particles.length).toEqual(10);
  });
  it('should have a frequency of 1 on invalid input', () => {
    compositeParticle.frequency = Number.NaN;
    expect(compositeParticle.frequency).toEqual(1);
  });
  it('should init with origin at 0,0', () => {
    expect(compositeParticle.origin).toEqual(new Coordinate());
  });
});
